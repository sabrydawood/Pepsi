const { ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");

const { ProfileCard } = require("discord-virus24");
const { getUser } = require("@schemas/User");
const { getMemberStats } = require("@schemas/MemberStats");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "profile",
  description: "Genrate profile Card to user or you",
  category: "PERMIUM",
  cooldown: 5,
  isPremium: false,
  botPermissions: ["AttachFiles"],
  userPermissions: ["SendMessages"],
  command: {
    enabled: true,
    usage: "<user>",
    minArgsCount: 1,
    aliases: ["pcard", "profilecard", "p"],
  },
  slashCommand: {
    enabled: true,
    ephemeral: false,
    options: [
      {
        name: "user",
        description: "user that you need to genrate card for him/her",
        type: ApplicationCommandOptionType.User,
        required: false,
      },
    ],
  },

  async messageRun(message, args, data) {
    let match = (await message.client.resolveUsers(args[0], true)) || message.member;

    const target = match[0];
    const db = await getUser(target);
    const memberStats = await getMemberStats(message.guild.id, target.id);
    const response = await genCard(target, db, memberStats, data.lang);
    await message.safeReply(response);
  },

  async interactionRun(interaction, data) {
    const user = interaction.options.getUser("user") || interaction.user;

    const db = await getUser(user);
    const memberStats = await getMemberStats(interaction.guild.id, user.id);

    const response = await genCard(user, db, memberStats, data.lang);
    await interaction.followUp(response);
  },
};

async function genCard(user, db, stats, lang) {
  if (!user) {
    return "Sorry but i didn't find this user try again ";
  }
  let level;
  let xp;
  let precense = user?.presence?.status?.toString() || "online";

  const xpNeeded = stats.level * stats.level * 100;

  if (!stats.level) {
    level = 0;
  } else {
    level = stats.level;
  }
  if (!stats.xp) {
    xp = 1;
  } else {
    xp = stats.xp;
  }

  let image = await new ProfileCard()
    //.setAddon("rep", false)//disallow rep box if you need to allow it clear this line also (coins, level,xp)
    .setAvatar(user.displayAvatarURL({ extension: "jpg" })) // loaded user avatar required extension (png, jpg,jpeg) only
    .setLevel(level) // add level count if addon level is true  only
    .setRep(450) // add rep count if addon rep is true  only
    .setColor("rep-box", "red") // change rep box color // also coins, xp, level use variableName-box
    .setColor("rep-text", "green") // change rep text color // also coins, xp, level use variableName-text
    .setUsername(user.tag) // user name from discord client
    .setXp("current", xp)
    .setXp("needed", xpNeeded)
    .setToken("token")
    .setStatues(precense) // as user statues online / idle /dnd
    .setBackground("https://cdn.discordapp.com/attachments/800023817480568852/800730959342207027/unknown.jpeg") // add background image if you didn't include this line will add custom background
    .toAttachment();
  let toAttach = image.toBuffer("image/png", 0.95);
  const attachment = new AttachmentBuilder(toAttach, { name: "Profile.png" });

  return { files: [attachment] };
}
