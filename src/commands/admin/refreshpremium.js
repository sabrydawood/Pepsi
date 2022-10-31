const { ApplicationCommandOptionType } = require("discord.js");
const { PREMIUM } = require("@root/config")
const { getUser } = require("@schemas/User");
const { getPremium } = require("@schemas/Premium");
let times = [
    "year",
    "month",
    "15days"
];
/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "refreshpremium",
  description: "add time to your premium featrus for this server",
  category: "ADMIN",
  userPermissions: ["ManageGuild"],
  command: {
    enabled: true,
    usage: "<new time>",
    minArgsCount: 1,
  },
  slashCommand: {
    enabled: true,
    ephemeral: false,
    options: [
      {
        name: "time",
        description: "Select plan time to add to your premium",
        type: ApplicationCommandOptionType.String,
         required: true,
        choices :[
  { name: '15 Days', value: "15days" },
	{ name: '1 Month', value: "month" },{ name: '1 Year', value: "year" },
        ]
			
      },
    ],
  },

  async messageRun(message, args, data) {
    /*  let premiumDb = await getPremium(message.guild)
  let time = args[0]
    const response = await addPremium(data.userDb, premiumDb,time, data.lang);*/
    //await message.safeReply(response);  
      await message.safeReply("not ready yet fetch later");
  },

  async interactionRun(interaction, data) {
     /* let premiumDb = await getPremium(interaction.guild)
  let time = interaction.options.getNumber("time")
    const response = await addPremium(data.userDb, premiumDb,time, data.lang);*/
  //  await interaction.followUp(response);
await interaction.followUp("not ready yet fetch later");
  },
};

async function addPremium(userDb,premium,time, lang) {
    
 let l = lang;//add soon
  let timedate ; 
  let coinsToClear;
    
   if(!times.includes(time)){
return "sorry you didn't add supported time `Supported times => `"+"\n\`\`\`js\n" +  times +"\n\`\`\`";  
      }
    if(premium.status.enabled){
        return "your guild is Already Enabled If you mean add time Please Use `refreshpremium` Command"
    }
    if(time === "year"){
    timedate = 365
    coinsToClear = percentCalculation(PREMIUM.COINS.YEAR, 10)

    }else if(time === "month"){
   timedate = 30
    coinsToClear = PREMIUM.COINS.MONTH    
      
    }else if(time === "15days"){
     timedate = 15
    coinsToClear = PREMIUM.COINS._15DAYS
    }
 if(userDb.bank < coinsToClear ){
   return "sorry but you didn't have enough coins into your bank if you have enough at your balance please deposit it first and try again\n you have Now coins at bank `" + userDb.bank + "` Coins"
   }
    userDb.bank -= coinsToClear;
   
    premium.status.enabled = true;
     premium.status.timestamp = new Date();
    await userDb.save();
    await premium.save();
    
    return "Successfully enabled premium featrus Congratulations 🎉"
}
function percentCalculation(a, b) {

	var c = (parseFloat(a)*parseFloat(b))/100;

	return parseFloat(c);

}

//res = percentCalculation(6000000, 10);
