const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { EMBED_COLORS, SUPPORT_SERVER, DASHBOARD } = require("@root/config");
const { timeformat } = require("@helpers/Utils");
const os = require("os");
const { stripIndent } = require("common-tags");

/**
 * @param {import('@structures/BotClient')} client
 */
module.exports = (client, lang) => {
       let l = lang.COMMANDS.INFORMATION.SHARED.BOTSTATS
  // STATS
  const guilds = client.guilds.cache.size;
  const channels = client.channels.cache.size;
  const users = client.guilds.cache.reduce((size, g) => size + g.memberCount, 0);

  // CPU
  const platform = process.platform.replace(/win32/g, "Windows");
  const architecture = os.arch();
  const cores = os.cpus().length;
  const cpuUsage = `${(process.cpuUsage().user / 1024 / 1024).toFixed(2)} MB`;

  // RAM
  const botUsed = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`;
  const botAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`;
  const botUsage = `${((process.memoryUsage().heapUsed / os.totalmem()) * 100).toFixed(1)}%`;

  const overallUsed = `${((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2)} GB`;
  const overallAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`;
  const overallUsage = `${Math.floor(((os.totalmem() - os.freemem()) / os.totalmem()) * 100)}%`;

  let desc = "";
  desc += `❒ ${l.GUILDS}: ${guilds}\n`;
  desc += `❒ ${l.USERS}: ${users}\n`;
  desc += `❒ ${l.CHANNELS}: ${channels}\n`;
  desc += `❒ ${l.WEBSOC}: ${client.ws.ping} ms\n`;
  desc += "\n";

  const embed = new EmbedBuilder()
    .setTitle(l.TITLE)
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(desc)
    .addFields(
      {
        name: l.F1,
        value: stripIndent`
        ❯ **OS:** ${platform} [${architecture}]
        ❯ **Cores:** ${cores}
        ❯ **Usage:** ${cpuUsage}
        `,
        inline: true,
      },
      {
        name: l.F2,
        value: stripIndent`
        ❯ **Used:** ${botUsed}
        ❯ **Available:** ${botAvailable}
        ❯ **Usage:** ${botUsage}
        `,
        inline: true,
      },
      {
        name: l.F3,
        value: stripIndent`
        ❯ **Used:** ${overallUsed}
        ❯ **Available:** ${overallAvailable}
        ❯ **Usage:** ${overallUsage}
        `,
        inline: true,
      },
      {
        name: l.F4,
        value: process.versions.node,
        inline: false,
      },
      {
        name: l.F5,
        value: "```" + timeformat(process.uptime()) + "```",
        inline: false,
      }
    );

  // Buttons
  let components = [];
  components.push(new ButtonBuilder().setLabel(l.LINK).setURL(client.getInvite()).setStyle(ButtonStyle.Link));

  if (SUPPORT_SERVER) {
    components.push(new ButtonBuilder().setLabel(l.SUPPORT).setURL(SUPPORT_SERVER).setStyle(ButtonStyle.Link));
  }

  if (DASHBOARD.enabled) {
    components.push(
      new ButtonBuilder().setLabel(l.WEB).setURL(DASHBOARD.baseURL).setStyle(ButtonStyle.Link)
    );
  }

  let buttonsRow = new ActionRowBuilder().addComponents(components);

  return { embeds: [embed], components: [buttonsRow] };
};
