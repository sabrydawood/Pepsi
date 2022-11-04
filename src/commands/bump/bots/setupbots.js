const { EmbedBuilder, ApplicationCommandOptionType, ChannelType , ActionRowBuilder, SelectMenuBuilder,ButtonBuilder,ButtonStyle,SelectMenuInteraction} = require("discord.js");
const { EMBED_COLORS } = require("@root/config.js");
const { stripIndent } = require("common-tags");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "bumpbots",
  description: "configuration your bot settings",
  category: "BUMP",
  userPermissions: ["ManageGuild"],
  command: {
    enabled: true,
    minArgsCount: 1,
    subcommands: [
      {
        trigger: "channel",
        description: "set channel that will bump the messages to it",
      },  
			{
        trigger: "description",
        description: "set your bot description",
      },    
			{
        trigger: "bot",
        description: "set your bot to get information",
      },
      {
        trigger: "debug <on|off>",
        description: "turns on/of bot bumps for your bot",
			},
      {
        trigger: "invite",
        description: "invite link for your bot",
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
        name: "bot",
        description: "set your bot",
       type: ApplicationCommandOptionType.Subcommand,
				options: [
					{
						name: "bot",
						description: "bot that you will setup it",
						type: ApplicationCommandOptionType.User,
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
			},
			      {
        name: "invite",
        description: "invite link for your bot",
       type: ApplicationCommandOptionType.Subcommand,
				options: [
					{
						name: "link",
						description: "link",
						type: ApplicationCommandOptionType.String,
						required: true,
					}
				]
      },

    ],
  },

  async messageRun(message, args, data) {
    const input = args[0].toLowerCase();
    const settings = data.settings;
		//setup channel
if (input === "channel") {
	
      const match = message.guild.findMatchingChannels(args[1]);
 if (!match.length) return message.safeReply(data.lang.NO_CHANNEL.replace("{channel}", args[1]));
      response = await setChannel(settings, match[0], data.lang);
} 
//setup description 

else if( input === "description"){
	
   const match = args[1];
      response = await setDesc(settings, match[0], data.lang);
}
// setup bot
	else if(input === "bot"){

   const match = args[1];
		response = await setBot(settings, match[0], data.lang);
	}
//invite link
else if(input === "invite"){

   const match = args[1];
		response = await setInvite(settings, match[0], data.lang);
			}
// debug on/off
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
    if (sub === "channel") {
const channel = interaction.options.getChannel("channel");
response = await setChannel(settings, channel, data.lang);					
		}
// setup description
else if ( sub === "description"){
	const desc = interaction.options.getString("description");
response = await setDesc(settings, desc, data.lang);			
}

		// setup bot
else if ( sub === "bot"){

	const bot = interaction.options.getUser("bot");
response = await setBot(settings, bot, data.lang);			
}
	//setup invite link
	else if ( sub === "invite"){

	const invite = interaction.options.getString("invite");
response = await setInvite(settings, invite, data.lang);			
	}
			// setup bot
	/*
else if ( sub === "langs"){
	
const response = await getLangs(interaction);
	
		 return waiter(response,interaction, data.settings, data.lang)
	
}
*/
	// debug on/off bumps
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
	settings.bump.bots.description = "\`\`\`js\n" + desc +"\n\`\`\`";
	await settings.save();
	return "Successfully set description to \`\`\`js\n" + desc +"\n\`\`\`"

}
async function setBot(settings, bot, lang) {
let data = settings.bump.bots;
if (!bot.bot) {
	return "this is not a bot please select bot to complete settings"
		 }else{
	data.name = bot.username;
	data._id = bot.id;
	data.avatar = bot.displayAvatarURL()
	data.image = bot.displayAvatarURL();
	await settings.save();
	return "successfully setup bot information use /preview to se it"
}
	
}
async function setDebug(settings, input, lang) {
  const status = input.toLowerCase() === "on" ? true : false;
  settings.bump.bots.enabled = status;
  await settings.save();
  return "Successfully configuration settings  to " + `${status ? lang.ENABLED: lang.DISABLED}`;
	}

async function setInvite(settings, invite, lang){
let checker= await isValidUrl(invite)
if(checker){
settings.bump.bots.invite_link = invite;
	await settings.save();
	return "Successfully configuration settings now invite link set to " + invite;
} else{
	return "Please add valid url Your intry invite is not working"
}
}

async function isValidUrl (url) {
	  	var urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
	    '(\\#[-a-z\\d_]*)?$','i'); 	  return !!urlPattern.test(url);
}





