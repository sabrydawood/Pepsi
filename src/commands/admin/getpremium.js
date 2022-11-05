const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { PREMIUM } = require("@root/config");
const prettyMS = require("pretty-ms");
const { getPremium } = require("@schemas/Premium");
let times = ["year", "month", "15days", "test"];
let choise = ["cash", "coins", "free"];
/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "getpremium",
  description: "get premium featrus for this server",
  category: "ADMIN",
  userPermissions: ["ManageGuild"],
  command: {
    enabled: true,
    usage: "<premium>",
    minArgsCount: 1,
  },
  slashCommand: {
    enabled: true,
    ephemeral: false,
    options: [
      {
        name: "time",
        description: "Select plan time",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          { name: "1 day test", value: "test" },
          { name: "15 Days", value: "15days" },
          { name: "1 Month", value: "month" },
          { name: "1 Year", value: "year" },
        ],
      },
      {
        name: "method",
        description: "Select method to to paid with it",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          //{ name: 'Free', value: "trail" },
          { name: "Cash", value: "cash" },
          { name: "Coins", value: "coins" },
        ],
      },
    ],
  },

  async messageRun(message, args, data) {
    let premiumDb = await getPremium(message.guild);
    let time = args[0];
    let method = args[1];
    const response = await addPremium(data.userDb, premiumDb, time, method, data.lang);
    await message.safeReply(response);
  },

  async interactionRun(interaction, data) {
    let premiumDb = await getPremium(interaction.guild);
    let time = interaction.options.getString("time"),
      method = interaction.options.getString("method");
    const response = await addPremium(data.userDb, premiumDb, time, method, data.lang);
    await interaction.followUp(response);
  },
};

async function addPremium(userDb, premium, time, method, lang) {
 // let l = lang; //add soon
  let timedate;
  let coinsToClear;
  let cash;
  let desc;
  let pay;
  let remaining;
  let guildName;
  const now = Date.now();
  //  let choise = splArr(method.choices)
  const embed = new EmbedBuilder().setAuthor({ name: "Premium Create" });
  if (!times.includes(time)) {
    desc = "sorry you didn't add supported time `Supported times => `" + "\n```js\n" + times + "\n```";
    embed.setDescription(desc);
  }
  if (premium.status.isTested) {
    pay = "Free Trail";
    desc =
      "We Are Sorry But this plane can obtain for one time Only Try another plane or check if there is a giveaway at my support server " +
      "<:MixFace4:803004709765251083>";

    embed.setDescription(desc);
  }
  if (premium.status.time) {
    if (premium.status.withCash) {
      pay = "Cash Payment";
    } else if (premium.status.withCoins) {
      pay = "Coins Payment";
    }
    const cooldown = premium.status.days * 24 * 60 * 60 * 1000;

    if (now - premium.status.time < cooldown) {
      remaining = prettyMS(
        Math.round(cooldown - (now - premium.status.time)),

        { verbose: true, unitCount: 3, secondsDecimalDigits: 0 }
      );

      desc =
        "your guild is Already Enabled If you mean add time Please Use `refreshpremium` Command you still have time => \n" +
        "<a:5415_WumpusHypesquad:803558462927405076> " +
        remaining;

      embed.setDescription(desc);
    }
  } else {
    if (time === "year") {
      timedate = 365;
      coinsToClear = percentCalculation(PREMIUM.COINS.YEAR, 10);
      pay = "1 YEAR";
      cash = percentCalculation(PREMIUM.CASH.YEAR, 10);
    } else if (time === "month") {
      timedate = 30;
      coinsToClear = PREMIUM.COINS.MONTH;
      pay = "1 MONTH";
      cash = PREMIUM.CASH.MONTH;
    } else if (time === "15days") {
      timedate = 15;
      coinsToClear = PREMIUM.COINS._15DAYS;
      cash = PREMIUM.CASH._15DAYS;
      pay = "15 DAYS";
    } else if (time === "test") {
      timedate = 1;
      coinsToClear = 0;
      cash = 0;
      premium.status.isTested = true;
      pay = "Free trail";
    }

    if (method === "coins") {
      if (userDb.bank < coinsToClear) {
        desc =
          "sorry but you didn't have enough coins into your bank if you have enough at your balance please deposit it first and try again\n you have Now coins at bank `" +
          userDb.bank +
          "` Coins" +
          "<a:5415_WumpusHypesquad:803558462927405076>";

        embed.setDescription(desc);
      }
      userDb.bank -= coinsToClear;
      premium.status.enabled = true;
      premium.status.withCoins = true;
      premium.status.withCash = false;
      premium.status.time = now;
      premium.status.days = timedate;
      premium.status.start = new Date().toLocaleDateString();
      premium.status.end = new Date(now + timedate * 24 * 60 * 60 * 1000).toLocaleDateString();
      await userDb.save();
      await premium.save();

      guildName = premium.data.name;
      desc =
        "Successfully enabled premium featrus Congratulations 🎉 For a " +
        time +
        " plane end at " +
        new Date(now + timedate * 24 * 60 * 60 * 1000).toLocaleDateString();

      embed.setDescription(desc);
      embed.addFields(
        { name: "Guild Name", value: guildName },
        { name: "\u200B", value: "\u200B" },
        { name: "Starts At", value: premium.status.start.toString(), inline: true },
        { name: "Ends At", value: premium.status.end.toString(), inline: true },
        { name: "Payment Method", value: pay, inline: true }
      );
    } else if (method === "cash") {
      guildName = premium.data.name;
      desc = "Sorry but I didn't allow this paid for now ";

      embed.setDescription(desc);
    } else if (!method || !choise.includes(method)) {
      desc = "please provide vaild method available methods `" + choise + "`";

      embed.setDescription(desc);
    }
  }

  return { embeds: [embed] };
}

function percentCalculation(a, b) {
  var c = (parseFloat(a) * parseFloat(b)) / 100;

  return parseFloat(c);
}
