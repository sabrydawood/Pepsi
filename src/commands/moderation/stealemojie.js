const { parseEmoji, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

const Discord = require("discord.js");
const { parse } = require("twemoji-parser");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "addemojie",
  description: "add emojie from another servers",
  category: "MODERATION",
  botPermissions: [],
  userPermissions: ["ModerateMembers"],
  command: {
    enabled: true,
    usage: "[emojie]",
  aliases: ["steal", "addemoji"],
    minArgsCount: 2,
  },
  slashCommand: {
    enabled: false,
    options: [
      {
        name: "emojie",
        description: "imojie id ",
        type: ApplicationCommandOptionType.String,
        required: false,
      },{
        name: "name",
        description: "imojie name ",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
  },

  async messageRun(message, args, data) {
		
    const emoji = args[1];
     const name = args[0];
    
if (name.includes("https://") || name.includes(":")) {

  
    message.channel.send("Give me a emoji name to save with it");
    return;
  }

    if (!emoji) return message.channel.send(`Please Give Me A Emoji!`);

    let customemoji = parseEmoji(emoji);
    if(message.content.includes("https://"))
    {
      var Link = args[1];
    }
    if (!message.content.includes("https://")) {
      var Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;
    }
    
   
     
      message.guild.emojis.create(
        `${Link}`,
        `${name}`
      ); 
      const Added = new EmbedBuilder()
        .setTitle(`Emoji Added`)
        .setColor(`${Color}`)
        .setDescription(
          `Emoji Has Been Added! | Name : ${name} | Preview : [Click Me](${Link})`)
        .setFooter(`If the emoji doesnt uploaded that means the emoji size you tryed to upload is more than 256.0 KB `);
      //return message.channel.send();
    await message.safeReply({ embeds: [Added] });
  },
}




   
  

