const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require("@root/config");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "inviteranks",
  description: "shows the invite ranks configured on this guild",
  category: "INVITE",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
  },
  slashCommand: {
    enabled: true,
  },

  async messageRun(message, args, data) {
    const response = await getInviteRanks(message, data.settings, data.lang);
    await message.safeReply(response);
  },

  async interactionRun(interaction, data) {
    const response = await getInviteRanks(interaction, data.settings, data.lang);
    await interaction.followUp(response);
  },
};

async function getInviteRanks({ guild }, settings, lang) {
    
      let l = lang.COMMANDS.INVITES.RANKS
  if (settings.invite.ranks.length === 0) return l.ERR ;
  let str = "";

  settings.invite.ranks.forEach((data) => {
    const roleName = guild.roles.cache.get(data._id)?.toString();
    if (roleName) {
      str += `❯ ${roleName}: ${data.invites} ${l.INV}\n`;
    }
  });

  const embed = new EmbedBuilder()
    .setAuthor({ name: l.AUTHOR })
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setDescription(str);
  return { embeds: [embed] };
}
