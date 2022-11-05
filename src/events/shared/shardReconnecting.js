const { sendWebhook } = require("@helpers/Utils");

module.exports = async (client, id) => {
  client.logger.warn(`Reconnecting shard: [${id}]`);

  sendWebhook(client, "Shard Reconnecting", `Reconnecting shard: [${id}]`);
};
