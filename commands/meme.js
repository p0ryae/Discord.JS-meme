const Discord = require('discord.js');
const got = require('got');

module.exports.run = async (bot, message, args) => {
	const embed = new Discord.MessageEmbed();
	got('https://www.reddit.com/r/memes/random/.json')
		.then(response => {
			const content = JSON.parse(response.body);
			const permalink = content[0].data.children[0].data.permalink;
			const memeUrl = `https://reddit.com${permalink}`;
			const memeImage = content[0].data.children[0].data.url;
			const memeTitle = content[0].data.children[0].data.title;
			const memeUpvotes = content[0].data.children[0].data.ups;
			const memeNumComments = content[0].data.children[0].data.num_comments;

			embed.setTitle(`${memeTitle}`);
			embed.setURL(`${memeUrl}`);
			embed.setColor('RANDOM');
			embed.setImage(memeImage);
			embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

			message.channel.send(embed);
		})
		.catch(console.error);
};

module.exports.config = {
	name: 'meme',
	aliases: [],
};
