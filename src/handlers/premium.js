const config = require("@root/config");
const {
	EmbedBuilder,
	WebhookClient
} = require("discord.js");
const prettyMS = require('pretty-ms');
const {
	getUser
} = require("@schemas/User");
const {
	getPremium
} = require("@schemas/Premium");
const { deffDays} = require("@helpers/Utils");
let now = Date.now();

 async function updatePremium(client) {
     for (const guild of client.guilds.cache.values()) {
 let owner;
  let premiumdb = await getPremium(guild)
 if(premiumdb){
     
	if (premiumdb.status.enabled) {
  let planeText;
let plane = deffDays(premiumdb.status.start, premiumdb.status.end);
  if(plane === "365"){ planeText= "Year" }else if(plane === "30") {planeText= "Month"} else if(plane === "15"){ planeText= "15 Days"} else if (plane === "1"){ planeText = "No Plane This is Test Only"}

 owner = client.users.cache.get(premiumdb.data.owner)
const cooldown = premiumdb.status.days * 24 * 60 * 60 * 1000;

			if (now - premiumdb.status.time > cooldown) {
const OwnerEmbed = new EmbedBuilder().setAuthor({
                    name: "Premium features Finished"
				}).setDescription ("Dear sir Your guild Premium features has been Finished if you need to repay it you can use Command `getpremium`").addFields(
	{
	name: "Guild Name",
	value: premiumdb.data.name ? premiumdb.data.name: "No Data",
	inline: true
					},
	{
			name: "Start At",
			value: new Date(premiumdb.status.start).toLocaleDateString() ? new Date(premiumdb.status.start).toLocaleDateString() : "No Data",
					}, 
  {
name: "Ends At",
value: new Date(premiumdb.status.end).toLocaleDateString() ? new Date(premiumdb.status.end).toLocaleDateString() : "No Data",
					},

       {

           name : "Plane",

           value: planeText ? planeText: "No Data"

       }
				);
   const HookEmbed = new EmbedBuilder().setAuthor({

                    name: "Premium features Finished"

				}).setDescription ("guild Premium features has been Finished").addFields(
	{

	name: "Guild Name",

	value: premiumdb.data.name ? premiumdb.data.name: "No Data",

	inline: true

					},
	{

	name: "Guild Owner",

	value: owner.tag ? owner.tag : "No Data",

	inline: true

					},
	{

			name: "Start At",

			value: new Date(premiumdb.status.start).toLocaleDateString() ? new Date(premiumdb.status.start).toLocaleDateString() : "No Data",

			inline: true

					}, 
    {

name: "Ends At",

value: new Date(premiumdb.status.end).toLocaleDateString() ? new Date(premiumdb.status.end).toLocaleDateString() : "No Data" ,
inline: true
},
       {
           name : "Plane",
           value: planeText  ? planeText : "No Data"
       }
				);
				try {    
                       premiumdb.status.enabled = false;
  premiumdb.status.days = 0;
premiumdb.status.time = 0;
  premiumdb.status.start = Date.now();
 premiumdb.status.end = Date.now();
	await premiumdb.save();
                    
  client.joinLeaveWebhook.send({
    username: "Premium Timer",
    avatarURL: client.user.displayAvatarURL(),
    embeds: [HookEmbed],
  });
                    if(owner){
owner.send({
embeds: [OwnerEmbed]})
} else return;
				}catch(e) {				client.logger.error(e)
				};
			}

		}
     
     
     }else{
         console.log("no data")
     }
          }                  
};
                            
module.exports = {
                            updatePremium,
                            }

