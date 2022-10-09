module.exports = {
REQ_BY: "Requested by {author}",
INVALID_USAGE:"Invalid command usage!",
INVALID_STATUS:"Invalid status. Value must be `on/off`",
INVALID_URL : "Please provide a valid url",
INVALID_CONTENT:"Insufficient arguments! Please provide valid content",
INVALID_COLOR : "Invalid color. Value must be a valid hex color",
INVALID_SUBCOMMAND: "Invalid subcommand",
MAX_LINES_ERR: "Must be a valid number greater than 0",
NOT_NUMBER: "Please enter a valid number input",
NO_PERMISSIONS: "Sorry but i don't have permission to fire this Action",
NO_CHANNEL: "No channel found matching {channel}",
ENABELD: "enabled",
DISABELD: "disabled",
	NOT_FOUND: "Not found",
COMMANDS:{
	
ADMIN:{
  AUTO_MOD:{
    ANTI_COMMAND:{
      GHOSTPING_DONE:"Configuration saved! Anti-Ghostping is now",
			ANITESPAM_DONE:"Antispam detection is now",
			MASSMENTION_DONE:"Mass mention detection is now"
    },
    AUTO_DELETE:{
      MESSAGE: "MESSAGES",
			ATTACH_DONE : "with attachments will now be automatically deleted",
			ATTACH_DONE2 :"will not be filtered for attachments now",
			INVITES_DONE:"with discord invites will now be automatically deleted",
			INVITES_DONE2:"will not be filtered for discord invites now",
			LINKS_DONE: "with links will now be automatically deleted",
			LINKS_DONE2:"will not be filtered for links now",
			MAX_LINES_DONE: "Maximum line limit is disabled",
			MAX_LINES_DONE2: "Messages longer than \`{input}\` lines will now be automatically deleted"
    },
    AUTO_MOD:{
      INVALID_ACTION: "Not a valid action. Action can be `Timeout`/`Kick`/`Ban`",
			NO_CONFIG: "Not Configured",
			DESC1: "**Max Lines**",
DESC2: "**Anti-Massmention**",
DESC3:"**Anti-Attachment**",
DESC4:"**Anti-Links**",
DESC5:"**Anti-Invites**",
DESC6:"**Anti-Spam**",
DESC7:"**Anti-Ghostping**",
			EMBED_AUTHOR: "Automod Configuration" ,
			EMBED_F1:"Log Channel",
			EMBED_F2:"Max Strikes",
			EMBED_F3:"Action",
			EMBED_F4:"Debug",
STRIKE_DONE:`Configuration saved! Maximum strikes set to {strikes}`,
			ACTION_DONE: `Configuration saved! Automod action is set to {action}`,
			DEBUG_DONE: `Configuration saved! Automod debug is now `,
			NO_WHITELISTED: "No channels are whitelisted",
			WHITELISTED_CH: "Whitelisted channels:",
			ALR_WHITELIATED : "Channel is already whitelisted",
			WHITELISTED: `Channel whitelisted!`,
			NOT_WHITELISTED: "Channel is not whitelisted",
			REMOVED_WHITELISTED: `Channel removed from whitelist!`,
    },
  },
  GREETINGS:{
    FARWELL:{
			NOT_ENABLED: "Farewell message not enabled in this server",
			NO_CONFIG: "No channel is configured to send farewell message",
			PREV_CHANNEL: "Sent farewell preview to",
			NO_PERMS: 
      "Ugh! I cannot send greeting to that channel? I need the `Write Messages` and `Embed Links` permissions in ",
			SETTINGS_DONE: "Configuration saved! Farewell message updated",
			
		},
    WELCOME:{
			NOT_ENABLED: "welcome message not enabled in this server",
			NO_CONFIG: "No channel is configured to send welcome message",
			PREV_CHANNEL: "Sent welcome preview to",
			NO_PERMS: 
      "Ugh! I cannot send greeting to that channel? I need the `Write Messages` and `Embed Links` permissions in ",
			SETTINGS_DONE: "Configuration saved! Welcome message updated",
		}
  },
  REACTION_ROLL:{
    ADD:{
			NO_CH : "No channels found matching",
			NO_ROLE: "No roles found matching",
			NEED_PERMS: "You need the following permissions in",
			ERR_ID: "Could not fetch message. Did you provide a valid messageId?",
			BOT_ROLES: "I cannot assign bot roles.",
			EVERY_ROLE: "You cannot assign the everyone role.",
			ROLE_POSTION: "Oops! I cannot add/remove members to that role. Is that role higher than mine?",
			EMOJI_OUTSERVER: "This emoji does not belong to this server",
			FAIL_REACT: "Oops! Failed to react. Is this a valid emoji",
			ROLE_CONFIGED: "A role is already configured for this emoji. Overwriting data,\n",
			DONE: "Done! Configuration saved"
		},
    REMOVE:{
			ERR : "Oops! An unexpected error occurred. Try again later",
			NEED_PERMS: "You need the following permissions in",
			ERR_ID: "Could not fetch message. Did you provide a valid messageId?",
			DONE: "Done! Configuration saved"
		}
  },
  AUTO_ROLE:{
		
	},
  COUNTER_SETUP:{},
  FLAG_TRANSLATION:{},
  MAX_WARN:{},
  MOD_LOG:{},
  SET_PREFIX:{}
},
ANIME:{
  REACT:{},
},
ECONOMY:{
  SUB:{
    BALANCE:{},
    DEP:{},
    TRANSFER:{},
    WITHDRAW:{}
  },
  BANK:{},
  BEG:{},
  DAILY:{},
  GAMBLE:{},
},
FUN:{
  ANIMAL:{},
  FACTS:{},
  FLIP:{},
  MEME:{},
  SNAKE:{},
  TOGETHER:{}
},
GIVEAWAYS:{
  SUB:{
    EDIT:{},
    END:{},
    LIST:{},
    PAUSE:{},
    REROLL:{},
    RESUME:{},
    START:{},
  },
  GIVEAWAY:{}
},
IMAGE:{
  FILTERS:{},
  GENERATOR:{}
},
INFORMATION:{
  MESSAGE:{
    AVATAR:{},
    BOTINVITE:{},
    BOTSTATS:{},
    CHANNELINFO:{},
    EMOJIINFO:{},
    GUILDINFO:{},
    UPTIME:{},
    USERINFO:{},
  },
  SHARED:{
    AVATAR:{},
    BOTINVITE:{},
    BOTSTATS:{},
    CHANNELINFO:{},
    EMOJIINFO:{},
    GUILDINFO:{},
    USERINFO:{},
  },
  SLASH:{
    BOT:{},
    INFO:{}
  },
   PING_COMMAND:{
     REPLY: `🏓 Pong : \`{ping}ms\``
   },
    LEADERBOARD: {
      RES_ERR : "Invalid Leaderboard type. Choose either `xp` or `invite`",
      DISABELD : "This Features is disabled on this server",
      NO_USERS: "No users in the leaderboard",
      XP_AUTHOR: "XP Leaderboard",
      INV_AUTHOR: "Invite Leaderboard",
},
},
  INVITES:{
		ADD_INVITES:{},
			INVITE_CODES:{},
		INVITER:{},
		INVITE_RANK:{},
		INVITERANKS:{},
		INVITES:{},
INVITETRACKER:{},
INVITEIMPORT:{},
RESTINVITES:{},
	},
  MODERATION:{
		MESSAGE:{	
		DEFINE:{},
			DISCONNECT:{},
		MOVE:{},
			PURGE:{},
			PURGE_ATTACHMENT:{},
PURGE_BOTS:{},
			PURGE_LINKS:{},
			PURGE_TOKEN:{},
			PURGE_USER:{},
			UNDEFINE:{},
			VMUTE:{},
VUNMUTE:{},
		},
			SHARED:{
				DEFINE:{},
				DISCONNECT:{},
				MOVE:{},
				UNDEFINE:{},
				VMUTE:{},
				VUNMUTE:{},
			},
		SLASH:{
			PURGE:{},
			VOICE:{},
		},
		BAN:{},
KICK:{},
NICK:{},
		SOFT_BAN:{},
TIMEOUT:{},
UNBAN:{},
UNTIMEOUT:{},
WARN:{},
WARNINGS:{},
	},
SOCIAL:{
	REP:{},
},
STATS:{
	RANK:{},
	STATS:{},
	STATS_TRACKING:{},
},
SUGGESTIONS:{
	SUGGEST:{},
		SUGGESTION:{},
},
TICKET:{
	TICKET:{},
		TICKET_CAT:{},
} ,
UTILS:{
	BIGEMOJIE:{},
		COVID:{},
	GITHUB:{},
	HELP:{},
	PASTE:{},
	POKDEX:{},
	PROXIS:{},
	SETLANG:{},
	TRANSLATE:{},
	URBAN:{},
	WEATHER:{},
},
},
  CONTEXTS:{},
	EVENTS:{
  MESSAGE_EVENT :{
    MENTION_REPLY :"> My prefix is \`{prefix}\`",
    MAINTACE_MESSAGE :"Sorry But Am Maintance Now \n Just Admins Can Use `Interaction'S/Command's`",
  },
  
},



  
}