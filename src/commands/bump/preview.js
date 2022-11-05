const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "preview",
  description: "shows your bump information for bot/guild",
  category: "BUMP",
  command: {
    enabled: true,
    aliases: ["pre"],
    minArgsCount: 1,
    usage: "<bot|guild>",
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "type",
        description: "type of preview to display",
        required: true,
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "Bot",
            value: "bot",
          },
          {
            name: "Guild",
            value: "guild",
          },
        ],
      },
    ],
  },

  async messageRun(message, args, data) {
    const type = args[0].toLowerCase();
    let response;
    let guild = message.guild;
    if (type === "bot") response = await getBotPreview(guild, data.settings, data.lang);
    else if (type === "guild") response = await getGuildPreview(guild, data.settings, data.lang);
    else response = data.lang.COMMANDS.INFORMATION.LEADERBOARD.RES_ERR;
    await message.safeReply(response);
  },

  async interactionRun(interaction, data) {
    const type = interaction.options.getString("type");
    let response;
    let guild = interaction.guild;

    if (type === "bot") response = await getBotPreview(guild, data.settings, data.lang);
    else if (type === "guild") response = await getGuildPreview(guild, data.settings, data.lang);
    else response = data.lang.COMMANDS.INFORMATION.LEADERBOARD.RES_ERR;
    await interaction.followUp(response);
  },
};

async function getGuildPreview(guild, settings, lang) {
  let data = settings.bump.guilds;
  //if guild in database enabled
  if (data.enabled) {
    const nonAnimated = [];
    const animated = [];
    guild.emojis.cache.forEach((e) => {
      if (e.animated) animated.push(e.toString());
      else nonAnimated.push(e.toString());
    });
    const animatedV =
      animated.join(" ").length > 1024 ? `${animated.join(" ").slice(1010)}...` : animated.join(" ") || "No emojies";
    const nonAnimatedV =
      nonAnimated.join(" ").length > 1024
        ? `${nonAnimated.join(" ").slice(1010)}...`
        : nonAnimated.join(" ") || "No emojies";

    const badges = [];
    const tags = [];

    for (const badge of data.badges) {
      if (!badge) continue;
      if (badge) badges.push(badge.toString());
    }
    for (const tag of data.tags) {
      if (!tag) continue;
      if (tag) tags.push(tag.toString());
    }

    let author = "Guild Preview",
      desc = `**__Description__**\n${data.description}`,
      thumb = data.avatar,
      image = data.iamge;
    let filds = [
      { name: "No animated Emojes", value: nonAnimatedV },
      { name: "Animated Emojies", value: animatedV },
      { name: "Guild name", value: data.name },
      { name: "isVariated", value: data.varifated ? "Yes" : "No" },
      { name: "Badges", value: badges.join(", ") ? badges.join(", ") : "No Badges Yet" },
      { name: "Bumbed Count", value: data.times },
      { name: "Tages", value: tags.join(", ") ? tags.join(", ") : "No Tags Yet" },
    ];
    let res = await createEmbed(author, desc, thumb, filds, image);
    return res;
  }
  //if not enabled
  else {
    return "please setup your guild settings first";
  }
}

async function getBotPreview(guild, settings, lang) {
  let data = settings.bump.bots;
  //if bot in database enabled
  if (data.enabled) {
    if (!data.invite_link) return "Please add your bot invite link";

    if (!data.channel_id) return "please select channel for bumps";

    if (!data.description) return "Can you add description to help people know more about your bot?";

    const badges = [];
    const tags = [];
    const langs = [];
    for (const badge of data.badges) {
      if (!badge) continue;
      if (badge) badges.push(badge.toString());
    }
    for (const lang of data.bot_lang) {
      if (!lang) continue;
      if (lang) langs.push(lang.toString());
    }
    for (const tag of data.tags) {
      if (!tag) continue;
      if (tag) tags.push(tag.toString());
    }

    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setAuthor({ name: "Bot Preview" })
      .setDescription(
        `**__Bot Description__**\n ${data.description}\n **__invite Link__**\n [${data.name}](${data.invite_link})`
      )
      .setThumbnail(data.avatar.toString())
      .addFields(
        { name: "Bot Name", value: data.name.toString() },
        { name: "Bot Id", value: data._id.toString() },
        { name: "isVarifated", value: data.varifated ? "Yes" : "No" },
        { name: "Badges", value: badges.join(", ") ? badges.join(", ") : "No Badges Yet" },
        { name: "Tages", value: tags.join(", ") ? tags.join(", ") : "No Tags Yet" },
        { name: "Bot Languages", value: tags.join(", ") ? langs.join(", ") : "En-Us" }
      )
      .setImage(data.image);
    return { embeds: [embed] };
  } //if bot us not enabled yet
  else {
    return "please setup your bot information first";
  }
}
async function createEmbed(author, desc, thumb, filds, image) {
  const embed = new EmbedBuilder()
    .setColor(0x00ff00)
    .setAuthor({ name: author })
    .setDescription(desc)
    .setThumbnail(thumb)
    .addFields(filds)
    .setImage(image);

  return { embeds: [embed] };
}
