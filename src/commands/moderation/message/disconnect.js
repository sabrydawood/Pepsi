const disconnect = require("../shared/disconnect");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "disconnect",
  description: "disconnect specified member from voice channel",
  category: "MODERATION",
  userPermissions: ["MuteMembers"],
  command: {
    enabled: true,
    usage: "<ID|@member> [reason]",
    minArgsCount: 1,
  },

  async messageRun(message, args, data) {
      

      let l = data.lang.COMMANDS.MODERATION.MESSAGE.DEFINE
    const target = await message.guild.resolveMember(args[0], true);
    if (!target) return message.safeReply(l.ERR ` ${args[0]}`);
    const reason = message.content.split(args[0])[1].trim();
    const response = await disconnect(message, target, reason, data.lang);
    await message.safeReply(response);
  },
};
