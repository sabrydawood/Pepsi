

const { getSettings } = require("@schemas/Guild");

module.exports =  class Bumper {

	
static bumpBots (data){
 return "bumpBots"
}

static bumpGuilds (data){
	return "bumpGuilds"
}
	
static autoBump(client){

	try {	    
 for (const guild of client.guilds.cache.values()) {

setInterval(async () =>{
let data =  await getSettings(guild);
	
  if(data.bump.auto){
	await Bumper.bumpBots(data);
  Bumper.bumpGuilds(data);
}
	}, 5000)
}
	} catch (e){
client.logger.error(e);
}
	
	
}

	


	
}