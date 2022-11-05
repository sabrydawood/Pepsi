const { sendWebhook } = require("@helpers/Utils");

module.exports = async (client, error, shardId) => {
  client.logger.error(`shard: [${shardId}] have ann error with ${error}`);
  sendWebhook(client, "Shard ERROR", `shard: [${shardId}] have ann error with ${error}`);
};
