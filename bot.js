require('module-alias/register');
require("dotenv").config();
//const {manager } = require("./Manger.js")
// register extenders
require("@helpers/extenders/Message");
require("@helpers/extenders/Guild");
require("@helpers/extenders/GuildChannel");

const { checkForUpdates } = require("@helpers/BotUtils");
const { initializeMongoose } = require("@src/database/mongoose");
const { BotClient } = require("@src/structures");
const { launch } = require("@root/dashboard/app");
const { validateConfiguration } = require("@helpers/Validator");

validateConfiguration();

// initialize client
const client = new BotClient();

client.loadCommands("src/commands");
client.loadContexts("src/contexts");
client.loadEvents("src/events");

// find unhandled promise rejections
process.on("unhandledRejection", (err) => client.logger.error(`Unhandled exception`, err));

(async () => {
  await console.clear();
  // initialize the database
  await initializeMongoose();

  // check for updates
 //await checkForUpdates();


  // start the client	
await client.login(process.env.BOT_TOKEN);
	
	client.on('debug', info => client.logger.debug(info));
	//let res = 
		await client.shard.broadcastEval((c) => c.guilds.cache.map((guild) => 
    guild.members.cache.size));



  
  // start the dashboard
  if (client.config.DASHBOARD.enabled) {
    client.logger.log("Launching dashboard");
    try {
       launch(client);
    } catch (ex) {
      client.logger.error("Failed to launch dashboard", ex);
    }
      }
	//console.log(client.emojie.APROVED);
	
})();
