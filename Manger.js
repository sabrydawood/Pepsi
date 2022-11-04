require('module-alias/register');
const { ShardingManager } = require('discord.js');
require("dotenv").config();
const { statusPoster } = require("@handlers/voteManger")
const { warn, error } = require("@helpers/Logger")
const {sendWebhook} =  require("@helpers/Utils")

//const client = require ("@root/client")

const manager = new ShardingManager('bot.js', { token: process.env.BOT_TOKEN,
 totalShards: "auto",
 timeout: -1,
 respawn: true                                     });

manager.on("shardCreate", shard => {
 //console.log(shard)
  /*shard.on('spawn', () => {
    warn(`Spawned shard: [${shard.id}]`);

  });*/

  shard.on('error', (err)=>{
    shard.respawn()
  })
});

statusPoster(manager);

manager.spawn({ amount: 'auto', delay: 15500, timeout: 60000 });

// find unhandled promise rejections
process.on('unhandledRejection', error => {
	console.log(error);
});

module.exports.manager
