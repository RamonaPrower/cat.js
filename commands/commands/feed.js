// imports
const { GuildCat } = require('../../utils/cat');
const strings = require('../../strings/cat.json');
const badfood = response => {
	return strings.badfood.some(i => {
		const newReg = new RegExp(i, 'gmi');
		return newReg.test(response.content);
	});
};
// exports
module.exports = {
	async execute(message) {
	const guildCat = await GuildCat.create(message.guild.id);
	const fedCatStr = guildCat.feed();
	message.channel.send(fedCatStr)
	.then(() => {
		if (fedCatStr === '<:meowsip:578260722652413976>') {
			message.channel.awaitMessages(badfood, { maxMatches: 1, time: 15000, errors: ['time'] })
			.then(() => {
				message.channel.send(strings.badfoodstring);
			})
			.catch(() => {
				console.log('nothing');
			});
		}
	});
	},
};


module.exports.info = {
	name: 'Feed',
	description: 'Feed the Cat',
	summon: 'feed',
};
module.exports.regexp = 'feed';
module.exports.tag = 'feed';