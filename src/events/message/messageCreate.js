const { commandHandler, automodHandler, statsHandler } = require("@src/handlers");
const { getSettings } = require("@schemas/Guild");

/**
 * @param {import('@src/structures').BotClient} client
 * @param {import('discord.js').Message} message
 */
module.exports = async (client, message) => {
  if (!message.guild || message.author.bot) return;
  const settings = await getSettings(message.guild);

  // check for bot mentions
  if (message.content.includes(`${client.user.id}`)) {
    message.channel.safeSend(`> My prefix is \`${settings.prefix}\``);
  }

  // command handler
  let isCommand = false;
  if (message.content && message.content.startsWith(settings.prefix)) {
    const invoke = message.content.replace(`${settings.prefix}`, "").split(/\s+/)[0];
    const cmd = client.getCommand(invoke);
    if (cmd) {
  if (client.config.Maintenance.ENABLED && client.config.OWNER_IDS.includes(message.author.id)) {
      isCommand = true;
    commandHandler.handlePrefixCommand(message, cmd, settings);
  }else {
    message.channel.send("Sorry But Am Maintance Now \n Just Admins Can Use Command's")
  }
    }
  }

  // stats handler
  if (settings.stats.enabled) await statsHandler.trackMessageStats(message, isCommand, settings);

  // if not a command
  if (!isCommand) await automodHandler.performAutomod(message, settings);
};
