const { ApplicationCommandOptionType } = require("discord.js");
const { getUser } = require("@schemas/User");
const { recursiveReadDirSync } = require("@helpers/Utils");
const path = require("path");
var fs = require('fs');   
var _ = require('lodash'); 
var fileNames = []

module.exports = {
  name: "setlang",
  description: "change your owen bot replys language",
  category: "UTILITY",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
    usage: "<new-lang>",
    minArgsCount: 1,
  },
  slashCommand: {
    enabled: true,
    ephemeral: true,
    options: [
      {
        name: "lang",
        description: "change your owen bot replys language",
        type: ApplicationCommandOptionType.String,
         required: true,
        choices :[
      { name: 'English', value: 'en' },
			{ name: 'Arabic', value: 'ar' },
			
        ]
			
      },
    ],
  },

  async messageRun(message, args, data) {
     //const userDb = await getUser(message.author);
    const newLang = args[0];
 

    const response = await setNewLang(newLang, data.userDb);
    await message.safeReply(response);
  },

  async interactionRun(interaction, data) {
    const response = await setNewLang(interaction.options.getString("lang"), data.userDb);
    await interaction.followUp(response);
  },
};

async function setNewLang(newLang, userDb) {
  
  if (newLang.length > 2) return "language length cannot exceed `2` characters";
if(fileNames.includes(newLang)){

  userDb.lang = newLang;
  await userDb.save();
  return `New User language is set to \`${newLang}\``;
}else {
  return `SORRY BUT I DIDN'T SUPPORT THIS LANGUAGE \n SUPPORTED LANGUAGES IS : \`${fileNames}\``;
}


}
(async function getLangs() {         
fs.readdir("lang/bot", function(err,list){
    _.forEach(list, function(f){
        fileNames.push(path.basename(f, ".js"));
     });
}); 
})();