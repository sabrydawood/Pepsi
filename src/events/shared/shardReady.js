

const {sendWebhook} =  require("@helpers/Utils")




module.exports = async (client, id,unavailableGuilds) => {
  client.logger.warn(` Shard [${id}] is ready`);

sendWebhook(client, "Shard Ready", ` Shard [${id}] is ready`)


	
}