const { parsePermissions } = require("@helpers/Utils");
const { timeformat } = require("@helpers/Utils");
const { getSettings } = require("@schemas/Guild");

const { getUser } = require("@schemas/User");


const cooldownCache = new Map();

module.exports = {
  /**
   * @param {import('discord.js').ContextMenuInteraction} interaction
   * @param {import("@structures/BaseContext")} context
   */
  handleContext: async function (interaction, context) {
      
const settings = await getSettings(interaction.guild);

    const userDb = await getUser(interaction.user);

  let language = userDb.lang;

  if (!language) language = "en";

  const lang = require(`@root/lang/bot/${language}`);
      
      

    const data = {};
    data.settings = settings;
    data.userDb = userDb;
    data.lang = lang
      
      
    // check cooldown
    if (context.cooldown) {
      const remaining = getRemainingCooldown(interaction.user.id, context);
      if (remaining > 0) {
        return interaction.reply({
          content: `You are on cooldown. You can again use the command after ${timeformat(remaining)}`,
          ephemeral: true,
        });
      }
    }

    // check user permissions
    if (interaction.member && context.userPermissions && context.userPermissions?.length > 0) {
      if (!interaction.member.permissions.has(context.userPermissions)) {
        return interaction.reply({
          content: `You need ${parsePermissions(context.userPermissions)} for this command`,
          ephemeral: true,
        });
      }
    }

    try {
      await interaction.deferReply({ ephemeral: context.ephemeral });
      await context.run(interaction, data);
    } catch (ex) {
      interaction.followUp("Oops! An error occurred while running the command");
      interaction.client.logger.error("contextRun", ex);
    } finally {
      applyCooldown(interaction.user.id, context);
    }
  },
};

/**
 * @param {string} memberId
 * @param {object} context
 */
function applyCooldown(memberId, context) {
  const key = context.name + "|" + memberId;
  cooldownCache.set(key, Date.now());
}

/**
 * @param {string} memberId
 * @param {object} context
 */
function getRemainingCooldown(memberId, context) {
  const key = context.name + "|" + memberId;
  if (cooldownCache.has(key)) {
    const remaining = (Date.now() - cooldownCache.get(key)) * 0.001;
    if (remaining > context.cooldown) {
      cooldownCache.delete(key);
      return 0;
    }
    return context.cooldown - remaining;
  }
  return 0;
}
