const { getReactionRoles } = require("@schemas/ReactionRoles");
const { EmbedBuilder } = require("discord.js")
module.exports = {
  /**
   * @param {import('discord.js').MessageReaction} reaction
   * @param {import('discord.js').User} user
   */
  async handleReactionAdd(reaction, user) {
    const role = await getRole(reaction);
    if (!role) return;

    const member = await reaction.message.guild.members.fetch(user.id);
    if (!member) return;

    await member.roles.add(role).catch(() => {});
 const embed = new EmbedBuilder()
      .setAuthor({name : "REACTION ROLE ADD"})
 .setColor("#00A56A")
    .setDescription(`We Have Been Added Role \`${role.name}\`\n From ${reaction.message.guild.name} Server`)
.setThumbnail(user.displayAvatarURL());
      
user.send({embeds : [embed]})
  },

  /**
   * @param {import('discord.js').MessageReaction} reaction
   * @param {import('discord.js').User} user
   */
  async handleReactionRemove(reaction, user) {
    const role = await getRole(reaction);
    if (!role) return;

    const member = await reaction.message.guild.members.fetch(user.id);
    if (!member) return;

    await member.roles.remove(role).catch(() => {});
    

 const embed = new EmbedBuilder()

      .setAuthor({name : "REACTION ROLE Remove"})
 .setColor("#D61A3C")
    .setDescription(`We Have Been Removed Role \`${role.name}\`\n From ${reaction.message.guild.name} Server`)
.setThumbnail(user.displayAvatarURL());

      

user.send({embeds : [embed]})
  },
};

/**
 * @param {import('discord.js').MessageReaction} reaction
 */
async function getRole(reaction) {
  const { message, emoji } = reaction;
  if (!message || !message.channel) return;

  const rr = getReactionRoles(message.guildId, message.channelId, message.id);
  const emote = emoji.id ? emoji.id : emoji.toString();
  const found = rr.find((doc) => doc.emote === emote);

  const reactionRole = found ? await message.guild.roles.fetch(found.role_id) : null;
  return reactionRole;
}
