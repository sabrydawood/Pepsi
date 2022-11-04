const { EmbedBuilder, ApplicationCommandOptionType, ChannelType } = require("discord.js");
const { EMBED_COLORS } = require("@root/config.js");
const { stripIndent } = require("common-tags");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "bumpguilds",
  description: "configuration your guild settings",
  category: "BUMP",
  userPermissions: ["ManageGuild"],
  command: {
    enabled: false,
    minArgsCount: 1,
    subcommands: [
      {
        trigger: "channel",
        description: "set channel that will bump the messages to it",
      },  
			{
        trigger: "description",
        description: "set your guild description",
      },
      {
        trigger: "debug <on|off>",
        description: "turns on/of bot bumps for your guild",
			}
    ],
  },
  slashCommand: {
    enabled: true,
    ephemeral: false,
    options: [
      {
        name: "channel",
        description: "set channel that will bump the messages to it",
       type: ApplicationCommandOptionType.Subcommand,
				options: [
					{
						name: "channel",
						description: "channel that will bump to it",
						type: ApplicationCommandOptionType.Channel,
						channelTypes: [ChannelType.GuildText],
						required: true,
					}
				]
      },
      {
        name: "description",
        description: "set your bot description",
       type: ApplicationCommandOptionType.Subcommand,
				options: [
					{
						name: "description",
						description: "channel that will bump to it",
						type: ApplicationCommandOptionType.String,
						required: true,
					}
				]
      },
			      {
        name: "debug",
        description: "enable/disable bot bumps for your bot",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "status",
            description: "configuration status",
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: [
              {
                name: "ON",
                value: "ON",
              },
              {
                name: "OFF",
                value: "OFF",
              },
            ],
          },
        ],
      }

    ],
  },

  async messageRun(message, args, data) {
    const input = args[0].toLowerCase();
    const settings = data.settings;
if (input === "channel") {
	
      const match = message.guild.findMatchingChannels(args[1]);
 if (!match.length) return message.safeReply(data.lang.NO_CHANNEL.replace("{channel}", args[1]));
      response = await setChannel(settings, match[0], data.lang);
} 
else if( input === "description"){
	
   const match = args[1];
      response = await setDesc(settings, match[0], data.lang);
}
else if (input === "debug") {
      const status = args[1].toLowerCase();
      if (!["on", "off"].includes(status)) return message.safeReply(data.lang.INVALID_STATUS);
      response = await setDebug(settings, status, data.lang);
}

  },

  async interactionRun(interaction, data) {
    const sub = interaction.options.getSubcommand();
    const settings = data.settings;
    let response;
// setup channel
    if (sub === "status") {
const channelId = interaction.options.getChannel("channel");
response = await setChannel(settings, channelId, data.lang);					
		}
// setup description
else if ( sub === "description"){
	const desc = interaction.options.getString("description");
response = await setDesc(settings, desc, data.lang);			
}


 else if (sub === "debug") response = await setDebug(settings, interaction.options.getString("status"), data.lang);


    await interaction.followUp(response);
  },
};

async function setChannel(settings, channel, lang) {
   
  if (settings.bump.bots.channel_id === channel.id) return "You have already seted this channel try another channel please if you need change it";
  settings.bump.bots.channel_id =  channel.id;
  await settings.save();
  return "Successfully setup channel to " + channel ;

}
async function setDesc(settings, desc, lang) {
	if (desc.lentgh > 4000) return "please add description less than 4000 character's"
	if (desc === "")return "please add description empty message not working"
	settings.bump.bots.description = "\`\`\`js\n`" + desc +"\n\`\`\``";
	await settings.save();
	return "Successfully set description to \`\`\`js\n`" + desc +"\n\`\`\``"

}
async function setDebug(settings, input, lang) {
  const status = input.toLowerCase() === "on" ? true : false;
  settings.automod.debug = status;
  await settings.save();
  return "Successfully configuration settings  to " + `${status ? lang.ENABLED: lang.DISABLED}`;
}
