const { sendWebhook } = require("@helpers/Utils");

module.exports = async (client, id) => {
  client.logger.warn(`Spawned shard: [${id}]`);

  sendWebhook(client, "Shard Spawned", `Spawned shard: [${id}]`);
};
