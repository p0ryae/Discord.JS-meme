const { Discord, Client, Partials, GatewayIntentBits } = require('discord.js');
const client = new Client({
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers],
});
const { loadCommands } = require('./utils/loadCommands');

client.login("BOT_TOKEN");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

loadCommands(client);

client.on('ready', bot => {
    console.log(`[BOT] Logged in as ${client.user.username}#${client.user.discriminator}.`)
});

client.on('messageCreate', message => {
    if (message.author.bot) return;

    const messageArray = message.content.split(/\s+/); // This regex splits on every whitespace
    const cmd = messageArray[0];
    const args = messageArray.slice(1);
    
    const prefix = "!";

    if (!message.content.startsWith(prefix)) return;
    
    const commandfile = client.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    commandfile.run(client, message, args);
});
