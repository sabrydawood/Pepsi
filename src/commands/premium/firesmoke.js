const { ApplicationCommandOptionType,
			AttachmentBuilder
			} = require("discord.js");

const { FireSmokeCard } = require("discord-virus24")

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "firesmoke",
  description: "Genrate Fire Card to user or you",
  category: "PERMIUM",
  cooldown: 5,
  isPremium: false,
  botPermissions: ["AttachFiles"],
  userPermissions: ["SendMessages"],
  command: {
    enabled: true,
    usage: "<user>",
    minArgsCount: 1,
    aliases: ["fscard", "firesmokecard"],
  },
  slashCommand: {
    enabled: true,
    ephemeral: false,
    options: [
      {
        name: "user",
        description: "user that you need to genrate card for him/her",
        type: ApplicationCommandOptionType.User,    required: false,
      },
    ],
  },

  async messageRun(message, args, data) {
 const match = await message.client.resolveUsers(args[0], true) || message.member;
    const target = match[0];

    const response = await genCard(target, data.lang);
    await message.safeReply(response);
  },

  async interactionRun(interaction, data) {
		const user = interaction.options.getUser("user") || interaction.user;
    const response = await genCard(user, data.lang);
    await interaction.followUp(response);
  },
};

async function genCard(user, lang) {

	if (!user) {
		return "Sorry but i didn't find this user try again "
	}

let image = await new FireSmokeCard()
.setAvatar(user.displayAvatarURL({extension: 'jpg'})) 
.toAttachment();

let	toAttach = image.toBuffer("image/png", 0.95)
const attachment = new AttachmentBuilder(toAttach, { name: 'FireSmoke.png' });



  return { files: [attachment] };
}

