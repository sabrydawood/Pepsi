const { EmbedBuilder } = require("discord.js");
const { getSettings: registerGuild } = require("@schemas/Guild");

/**
 * @param {import('@src/structures').BotClient} client
 * @param {import('discord.js').Guild} guild
 */
module.exports = async (client, guild) => {
  if (!guild.available) return;
  if (!guild.members.cache.has(guild.ownerId)) await guild.fetchOwner({ cache: true }).catch(() => {});
  client.logger.log(`Guild Joined: ${guild.name} Members: ${guild.memberCount}`);
  await registerGuild(guild);

  if (!client.joinLeaveWebhook) return;

const joinEmbed = new EmbedBuilder()
	.setTitle("Thanks For Adding Me")
    .setThumbnail(guild.iconURL())
.setColor(client.config.EMBED_COLORS.SUCCESS)
	.setDescription(`We are happy with new guild and hope we help /make your guild reach more users \n
 am NS Bot i can help you to protect /moderate/ make fun/ create tickets / create suggestions/ giveaways/ and mush more / you can start using me to config some data with commands by slash commanads /\`Ping for prefix\` or make it easy with \`dashboard\` god bless you 💗 `);
	try {
let channelID;
    const channels = guild.channels.cache;
  for (let c of channels) {
      const channelType = c[1].type;
		// channel type 0 equals GUILD_TEXT
      if (channelType === 0) {
        channelID = c[0];
        break;
      }
    }

    const channel = client.channels.cache.get(guild.systemChannelId || channelID);
   channel.send({embeds: [joinEmbed]})
let invite; 
		channel.createInvite({maxAge: 0, maxUses: 0})
  .then(inv => invite = inv )
  .catch(console.error);

	

  const embed = new EmbedBuilder()
    .setTitle("Guild Joined")
    .setThumbnail(guild.iconURL())
    .setColor(client.config.EMBED_COLORS.SUCCESS)
    .addFields(
      {
        name: "Guild Name",
        value: guild.name,
        inline: false,
      },
      {
        name: "ID",
        value: guild.id,
        inline: false,
      },
      {
        name: "Owner",
        value: `${client.users.cache.get(guild.ownerId).tag} [\`${guild.ownerId}\`]`,
        inline: false,
      },
      {
        name: "Members",
        value: `\`\`\`yaml\n${guild.memberCount}\`\`\``,
        inline: false,
      }
    )
    .setFooter({ text: `Guild #${client.guilds.cache.size}` });

  client.joinLeaveWebhook.send({
	//	content: `${invite}`,
    username: "Guild Join",
    avatarURL: client.user.displayAvatarURL(),
    embeds: [embed],
  });
			} catch (e){
client.logger.error(e)
	}
};
