module.exports = {
  BOT_NAME : "NEW STEP",
  OWNER_IDS: ["799984138111287337"],// Bot owner ID's
  PREFIX: ".", // Default prefix for the bot
  SUPPORT_SERVER: "https://discord.gg/WsJp96BK22", // Your bot support server
  CLIENT_ID: "800008189679763466",
  INTERACTIONS: {
    SLASH: true, // Should the interactions be enabled
    CONTEXT: true, // Should contexts be enabled 
      
    GLOBAL: true, // Should the interactions be registered globally
    TEST_GUILD_ID: "827294479479472149", // Guild ID where the interactions should be registered. [** Test you commands here first **]
  },
  EMBED_COLORS: {
    BOT_EMBED: "#068ADD",
    TRANSPARENT: "#36393F",
    SUCCESS: "#00A56A",
    ERROR: "#D61A3C",
    WARNING: "#F7E919",
  },
  CACHE_SIZE: {
    GUILDS: 100,
    PREMIUM: 100,
    USERS: 10000,
    MEMBERS: 10000,
  },
  MESSAGES: {
    API_ERROR: "Unexpected Backend Error! Try again later or contact support server",
  },

  // PLUGINS

  AUTOMOD: {
    ENABLED: true,
    LOG_EMBED: "#36393F",
    DM_EMBED: "#36393F",
  },

  DASHBOARD: {
    enabled: false, // enable or disable dashboard
    baseURL: "http://de4.bot-hosting.net:6319", // base url
    failureURL: "http://de4.bot-hosting.net:6319", // failure redirect url
    port: "6319", // port to run the bot on
  },
//152.70.156.177:25606
  ECONOMY: {
    ENABLED: true,
    CURRENCY: "<a:stary:800439788347588618>",
    DAILY_COINS: Math.floor(Math.random() * 700) , // coins to be received by daily command
    MIN_BEG_AMOUNT: 100, // minimum coins to be received when beg command is used
    MAX_BEG_AMOUNT: 2500, // maximum coins to be received when beg command is used
  },

  GIVEAWAYS: {
    ENABLED: true,
    REACTION: "🎁",
    START_EMBED: "#FF468A",
    END_EMBED: "#FF468A",
  },

  IMAGE: {
    ENABLED: true,
    BASE_API: "https://image-api.strangebot.xyz",
  },

  INVITE: {
    ENABLED: true,
  },
  Maintenance:{
    ENABLED: false,
  },
  MODERATION: {
    ENABLED: true,
    EMBED_COLORS: {
      TIMEOUT: "#102027",
      UNTIMEOUT: "#4B636E",
      KICK: "#FF7961",
      SOFTBAN: "#AF4448",
      BAN: "#D32F2F",
      UNBAN: "#00C853",
      VMUTE: "#102027",
      VUNMUTE: "#4B636E",
      DEAFEN: "#102027",
      UNDEAFEN: "#4B636E",
      DISCONNECT: "RANDOM",
      MOVE: "RANDOM",
    },
  },

  PRESENCE: {
    ENABLED: true, // Whether or not the bot should update its status
    STATUS: ["online", "idle", "dnd"], // The bot's status [online, idle, dnd, invisible]
    TYPE: ["COMPETING", "WATCHING", "LISTENING", "STREAMING"], // Status type for the bot [PLAYING | LISTENING | WATCHING | COMPETING]
    MESSAGE: [
"{members} members",
"{servers} servers",
"Time to Go space",
"Ping For Prefix",
"Slach/text: Cmds"
    ], // Your bot status message
  },

  STATS: {
    ENABLED: true,
    XP_COOLDOWN: 3, // Cooldown in seconds between messages
    DEFAULT_LVL_UP_MSG: "{member:tag}, You just advanced to **Level {level}**",
  },

  SUGGESTIONS: {
    ENABLED: true, // Should the suggestion system be enabled
    EMOJI: {
      UP_VOTE: "⬆️",
      DOWN_VOTE: "⬇️",
    },
    DEFAULT_EMBED: "#4F545C",
    APPROVED_EMBED: "#43B581",
    DENIED_EMBED: "#F04747",
  },

  TICKET: {
    ENABLED: true,
    CREATE_EMBED: "#068ADD",
    CLOSE_EMBED: "#068ADD",
  },
  PREMIUM:{
	ENABLED: true,
      COINS:{
  YEAR: 6000000,
  MONTH: 500000,
  _15DAYS: 250000},
      CASH:{
          YEAR: 11,
          MONTH: 1,
          _15DAYS: 0.5
      }
  },
	BUMP:{
	   ENABLED: true,
		 COINS_PER_BUMP: 1000,
		
	},
    LANGS:["en","ar"]
};
