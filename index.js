const Discord = require('discord.js');
const fs = require("fs");
const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const client = new Discord.Client(
    {
        intents: ["GUILDS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES"]
    }
);
const config = require("./config.json");
let hastebin = require("hastebin");

client.commands = new Discord.Collection();

const commandsFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandsFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const commandsFolder = fs.readdirSync("./commands");
for (const folder of commandsFolder) {
  const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
  for (const file of commandsFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
    console.log("✅ " + command.name)
  }
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(...args, client));
};


client.on("message", message => {
  const prefix = config.prefix;

  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) return

  var comando = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

  if (comando.Staff) {
    if (!message.member.roles.cache.get(config.roleSupport)) {
      message.channel.send("You are not allowed to execute this command!")
      return
    }
  }


  comando.execute(message, client, args);
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, client, config);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true
    });
  };
});

client.login(config.token);

/*
    Bot developed by: manuelsw (Hydra Studios' Owner & discord.js Developer)
    if you want donate he, donate in this link! paypal.me/tendyyx
    Contact me for support!
    For support: https://discord.gg/kkqa2uYa

    Email: manuelsw.dev@gmail.com
    Discord: manuelsw#0001
    Telegram: @manuelsw
*/ 