const { ApplicationCommandOptionType } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "anti",
  description: "manage various automod settings for the server",
  category: "AUTOMOD",
  userPermissions: ["ManageGuild"],
  command: {
    enabled: true,
    minArgsCount: 2,
    subcommands: [
      {
        trigger: "ghostping <on|off>",
        description: "detect and logs ghost mentions in your server",
      },
      {
        trigger: "spam <on|off>",
        description: "enable or disable antispam detection",
      },
      {
        trigger: "massmention <on|off> [threshold]",
        description: "enable or disable massmention detection [default threshold is 3 mentions]",
      },
    ],
  },
  slashCommand: {
    enabled: true,
    ephemeral: false,
    options: [
      {
        name: "ghostping",
        description: "detects and logs ghost mentions in your server",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "status",
            description: "configuration status",
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: [
              {
                name: "ON",
                value: "ON",
              },
              {
                name: "OFF",
                value: "OFF",
              },
            ],
          },
        ],
      },
      {
        name: "spam",
        description: "enable or disable antispam detection",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "status",
            description: "configuration status",
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: [
              {
                name: "ON",
                value: "ON",
              },
              {
                name: "OFF",
                value: "OFF",
              },
            ],
          },
        ],
      },
      {
        name: "massmention",
        description: "enable or disable massmention detection",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "status",
            description: "configuration status",
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: [
              {
                name: "ON",
                value: "ON",
              },
              {
                name: "OFF",
                value: "OFF",
              },
            ],
          },
          {
            name: "threshold",
            description: "configuration threshold (default is 3 mentions)",
            required: false,
            type: ApplicationCommandOptionType.Integer,
          },
        ],
      },
    ],
  },

  async messageRun(message, args, data) {
    const settings = data.settings;
    const sub = args[0].toLowerCase();

    let response;
    if (sub == "ghostping") {
      const status = args[1].toLowerCase();
      if (!["on", "off"].includes(status)) return message.safeReply(data.lang.INVALID_STATUS);
      response = await antiGhostPing(settings, status, data.lang);
    }

    //
    else if (sub == "spam") {
      const status = args[1].toLowerCase();
      if (!["on", "off"].includes(status)) return message.safeReply(data.lang.INVALID_STATUS);
      response = await antiSpam(settings, status, data.lang);
    }

    //
    else if (sub === "massmention") {
      const status = args[1].toLowerCase();
      const threshold = args[2] || 3;
      if (!["on", "off"].includes(status)) return message.safeReply(data.lang.INVALID_STATUS);
      response = await antiMassMention(settings, status, threshold, data.lang);
    }

    //
    else response = data.lang.INVALID_USAGE ;
    await message.safeReply(response);
  },

  async interactionRun(interaction, data) {
    const sub = interaction.options.getSubcommand();
    const settings = data.settings;

    let response;
    if (sub == "ghostping") response = await antiGhostPing(settings, interaction.options.getString("status"), data.lang);
    else if (sub == "spam") response = await antiSpam(settings, interaction.options.getString("status"), data.lang);
    else if (sub === "massmention") {
      response = await antiMassMention(
        settings,
        interaction.options.getString("status"),
        interaction.options.getInteger("amount"), data.lang
      );
    } else response = data.lang.INVALID_USAGE;

    await interaction.followUp(response);
  },
};

async function antiGhostPing(settings, input, lang) {
  const status = input.toUpperCase() === "ON" ? true : false;
  settings.automod.anti_ghostping = status;
  await settings.save();
  return `${lang.COMMANDS.ADMIN.AUTO_MOD.ANTI_COMMAND.GHOSTPING_DONE}\` ${status ? lang.ENABELD : lang.DISABELD}\``;
}

async function antiSpam(settings, input, lang) {
  const status = input.toUpperCase() === "ON" ? true : false;
  settings.automod.anti_spam = status;
  await settings.save();
  return `${lang.COMMANDS.ADMIN.AUTO_MOD.ANTI_COMMAND.ANITESPAM_DONE}\` ${status ? lang.ENABELD : lang.DISABELD }\``;
}

async function antiMassMention(settings, input, threshold, lang) {
  const status = input.toUpperCase() === "ON" ? true : false;
  if (!status) {
    settings.automod.anti_massmention = 0;
  } else {
    settings.automod.anti_massmention = threshold;
  }
  await settings.save();
  return `${lang.COMMANDS.ADMIN.AUTO_MOD.ANTI_COMMAND.MASSMENTION_DONE}\` ${status ? lang.ENABELD : lang.DISABELD}\``;
}
