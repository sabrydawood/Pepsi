const { getSettings } = require("@schemas/Guild");
const {EmbedBuilder} = require("discord.js")
module.exports = class Bumper {
  /**
   * @param data : {guild, settings,lang}
   */
  static bumpBots(data, guild) {
    //define data as variables

    let settings = data.data;
    let lang = data.lang;

    // fetch settings that required
    if (!settings.bump.bots.enabled) {
      return "Sorry but you need to enabled bump bots for this to work.";
    } else if (!settings.bump.bots.invite_link) {
      return "Please add your bot invite link";
    } else if (!settings.bump.bots.channel_id) {
      return "please select channel for bumps";
    } else if (!settings.bump.bots.description) {
      return "Can you add description to help people know more about your bot?";
    }

    // get badges/tags/langs
    const badges = [];
    const tags = [];
    const langs = [];
    for (const badge of settings.bump.bots.badges) {
      if (!badge) continue;
      if (badge) badges.push(badge.toString());
    }
    for (const lang of settings.bump.bots.bot_lang) {
      if (!lang) continue;
      if (lang) langs.push(lang.toString());
    }
    for (const tag of settings.bump.bots.tags) {
      if (!tag) continue;
      if (tag) tags.push(tag.toString());
    }

    // embed bot information

    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setAuthor({ name: settings.bump.bots.name })
      .setDescription(
        `**__Bot Description__**\n ${settings.bump.bots.description}\n **__invite Link__**\n [${settings.bump.bots.name}](${settings.bump.bots.invite_link})`
      )
      .setThumbnail(settings.bump.bots.avatar.toString())
      .addFields(
        { name: "Bot Name", value: settings.bump.bots.name.toString() },
        { name: "Bot Id", value: settings.bump.bots._id.toString() },
        { name: "isVarifated", value: settings.bump.bots.varifated ? "Yes" : "No" },
        { name: "Badges", value: badges.join(", ") ? badges.join(", ") : "No Badges Yet" },
        { name: "Tages", value: tags.join(", ") ? tags.join(", ") : "No Tags Yet" },
        { name: "Bot Languages", value: tags.join(", ") ? langs.join(", ") : "En-Us" }
      )
      .setImage(settings.bump.bots.image)(
      // get channel that we need to send to it
      async () => {
        const channels = settings.bump.bots.channel_id;

        let channel = guild.channles.cache.get(channels);
        if (!channel) return;
        await channel.send({ embeds: [embed] });

        return "bot has been bumbed Successfully ";
      }
    )();
  }
  /**
   * @param data : {guild, settings,lang}
   */
  static bumpGuilds(data, guilds) {
    return "bumpGuilds is not enabled at this `verison: 0.0.2` will be allowed next version\nPlease be patient 😁";
  }

  static autoBump(client) {
    try {
      for (const guild of client.guilds.cache.values()) {
        setInterval(async () => {
          let data = {};
          data.settings = await getSettings(guild);

          if (data.settings.bump.auto) {
            await Bumper.bumpBots(data, guild);
            Bumper.bumpGuilds(data, guild);
          }
        }, 5000);
      }
    } catch (e) {
      client.logger.error(e);
    }
  }
};
