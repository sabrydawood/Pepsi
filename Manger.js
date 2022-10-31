require('module-alias/register');
const { ShardingManager } = require('discord.js');
require("dotenv").config();
const { statusPoster } = require("@handlers/voteManger")

const manager = new ShardingManager('./bot.js', { token: process.env.BOT_TOKEN,
 totalShards: 11,
 timeout: -1,
 respawn: true                                     });

manager.on("shardCreate", shard => {
  shard.on('reconnecting', () => {
    console.log(`Reconnecting shard: [${shard.id}]`);
  });
  shard.on('spawn', () => {
    console.log(`Spawned shard: [${shard.id}]`);
  });
  shard.on('ready', () => {
    console.log(` Shard [${shard.id}] is ready`);
  });
  shard.on('death', () => {
    console.log(`Died shard: [${shard.id}]`);
  });
  shard.on('error', (err)=>{
    console.log(`Error in  [${shard.id}] with : ${err} `)
    shard.respawn()
  })
});

statusPoster(manager);

manager.spawn({ amount: 'auto', delay: 15500, timeout: 60000 });
module.exports = manager
