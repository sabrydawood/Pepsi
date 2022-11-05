const { sendWebhook } = require("@helpers/Utils");

module.exports = async (client, event, id) => {
  client.logger.warn(`shard: [${id}] is Disconnected with ${event.name}`);

  sendWebhook(client, "Shard Disconnect", `shard: [${id}] is Disconnected with ${event.name}`);
};
