const { sendWebhook } = require("@helpers/Utils");

module.exports = async (client, id, replayedEvents) => {
  client.logger.warn(` Resumed shard: [${id}] with ${replayedEvents}`);

  sendWebhook(client, "Shard Resumed", ` Resumed shard: [${id}] with ${replayedEvents}`);
};
