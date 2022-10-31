const mongoose = require("mongoose");
const { CACHE_SIZE } = require("@root/config.js");
const FixedSizeMap = require("fixedsize-map");
const { getUser } = require("./User");
const cache = new FixedSizeMap(CACHE_SIZE.PREMIUM);

const Schema = new mongoose.Schema(
  {
    _id: String,
      

  data: {
    name: String,
    region: String,
    owner: { type: String, ref: "users" },
    joinedAt: Date,
    leftAt: Date,
  },
    status: {
      enabled: {
          type:Boolean, 
          default: false
 },      isTested: {
          type:Boolean, 
          default: false
 },
         withCoins: {
          type:Boolean, 
          default: false
 },
           withCash: {
          type:Boolean, 
          default: false
 },
      days: Number,
      time: Number,
      start: Date,
      end: Date,
    },
  },
  {
    timestamps:
      {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Model = mongoose.model("premiumFeatures", Schema);

module.exports = {
  /**
   * @param {import('discord.js').User} user
   */
  getPremium: async (guild) => {
    if (!guild) throw new Error("Guild is undefined");
    if (!guild.id) throw new Error("Guild Id is undefined");

    const cached = cache.get(guild.id);
    if (cached) return cached;

    let guildData = await Model.findById(guild.id);
    if (!guildData) {
      // save owner details

      // create a new guild model
      guildData = new Model({
        _id: guild.id,
        data: {
          name: guild.name,
          region: guild.preferredLocale,
          owner: guild.ownerId,
    joinedAt: guild.joinedAt,
        },
      });

      await guildData.save();
    }
    cache.add(guild.id, guildData);
    return guildData;
  },
};
