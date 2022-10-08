const botinvite = require("../shared/botinvite");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "botinvite",
  description: "gives you bot invite",
  category: "INFORMATION",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
    aliases: ["botinv", "invite"],
  },

  async messageRun(message, args, data) {
    const response = botinvite(message.client, data.lang);
    try {
      await message.author.send(response);
      return message.safeReply("Check your DM for my information! :envelope_with_arrow:");
    } catch (ex) {
      return message.safeReply("I cannot send you my information! Is your DM open?");
    }
  },
};
