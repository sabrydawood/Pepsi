const { ApplicationCommandOptionType } = require("discord.js");
const { Bumper } = require("@src/handlers");
/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "bump",
  description: "bump bot/guild",
  category: "BUMP",
  command: {
    enabled: true,
    aliases: ["share"],
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

  async messageRun(message, args,data) {
    const type = args[0].toLowerCase();
    let response;
let guild = message.guild; 
if (type === "bot") response = await await Bumper.bumpBots(guild,data.settings, data.lang);
else if(type === "guild") response =  await Bumper.bumpGuilds(guild, data.settings, data.lang)
		    else response = data.lang.COMMANDS.INFORMATION.LEADERBOARD.RES_ERR;
    await message.safeReply(response);

  },

  async interactionRun(interaction,data) {
    const type = interaction.options.getString("type");
    let response;
		let guild = interaction.guild;

if (type === "bot") response = await Bumper.bumpBots(guild,data.settings, data.lang);
else if(type === "guild") response =  await Bumper.bumpGuilds(guild, data.settings, data.lang)
		else response = data.lang.COMMANDS.INFORMATION.LEADERBOARD.RES_ERR;
    await interaction.followUp(response);
		
  },
};
