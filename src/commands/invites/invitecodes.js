const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { EMBED_COLORS } = require("@root/config.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "invitecodes",
  description: "list all your invites codes in this guild",
  category: "INVITE",
  botPermissions: ["EmbedLinks", "ManageGuild"],
  command: {
    enabled: true,
    usage: "[@member|id]",
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "user",
        description: "the user to get the invite codes for",
        type: ApplicationCommandOptionType.User,
        required: false,
      },
    ],
  },

  async messageRun(message, args, data) {
    const target = (await message.guild.resolveMember(args[0])) || message.member;
    const response = await getInviteCodes(message, target.user, data.lang);
    await message.safeReply(response);
  },

  async interactionRun(interaction, data) {
    const user = interaction.options.getUser("user") || interaction.user;
    const response = await getInviteCodes(interaction, user, data.lang);
    await interaction.followUp(response);
  },
};

async function getInviteCodes({ guild }, user, lang) {
    
      let l = lang.COMMANDS.INVITES.CODES
  const invites = await guild.invites.fetch({ cache: false });
  const reqInvites = invites.filter((inv) => inv.inviter.id === user.id);
  if (reqInvites.size === 0) return `\`${user.tag}\` ${l.ERR}`;

  let str = "";
  reqInvites.forEach((inv) => {
    str += `❯ [${inv.code}](${inv.url}) : ${inv.uses} ${l.USES} \n`;
  });

  const embed = new EmbedBuilder()
    .setAuthor({ name: l.AUTHIR + ` ${user.username}` })
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setDescription(str);

  return { embeds: [embed] };
}
