const Discord = require('discord.js');
const bot = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const { loadCommands } = require('./utils/loadCommands');

bot.login("BOT_TOKEN");

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

loadCommands(bot);
