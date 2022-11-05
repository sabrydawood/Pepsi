const { EmbedBuilder, WebhookClient } = require("discord.js");
const { AutoPoster } = require("topgg-autoposter");
// const { getUserBot } = require('../../../../../../../../../../../../../../../../const client = require ("@root/client")

//const manger = require("@root/Manger");
const webhookSender = process.env.ERROR_LOGS ? new WebhookClient({ url: process.env.ERROR_LOGS }) : undefined;
module.exports = {
  async voteTraker(vote) {
    const embed = new EmbedBuilder()

      .setAuthor({ name: "Vote Traker" })

      .setDescription("Catched New Vote")

      .addFields(
        {
          name: "Voted User",

          value: `${vote.user}`,
        },

        {
          name: "will aded ",

          value: `🙂🙂`,
        }
      );

    webhookSender.send({
      username: "Vote Tracker",

      // avatarURL: client.user.displayAvatarURL(),

      embeds: [embed],
    });
  },

  async statusPoster(manger) {
    const ap = AutoPoster(process.env.DBL_TOKEN, manger);

    ap.on("posted", (stats) => {
      // console.log(ap)
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Discord Api Status Poster" })
        .setDescription("Posted stats to Top.gg")
        .addFields(
          { name: "Servers Count", value: `${stats.serverCount}` },
          { name: "Shards Count", value: `${stats.shardCount}` }
          // {name : "Total Text Commands",
          //value: `${stats.shardCount}`}
        );
      webhookSender.send({
        username: "Api Status",
        // avatarURL: client.user.displayAvatarURL(),
        embeds: [embed],
      });
    });
  },
};
