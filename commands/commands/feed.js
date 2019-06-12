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
	async execute(message, awaitHandler) {
		// create cat
	const guildCat = await GuildCat.create(message.guild.id);
	// feed that cat!
	const fedCatStr = await guildCat.feed();
	message.channel.send(fedCatStr)
	.then(() => {
		if (fedCatStr === '<:meowsip:578260722652413976>') {
			// we add the current channel to the awaitHandler to stop double posts
			awaitHandler.add(message.channel.id);
			message.channel.awaitMessages(badfood, { maxMatches: 1, time: 15000, errors: ['time'] })
			.then(() => {
				message.channel.send(strings.badfoodstring);
				setTimeout(() => {awaitHandler.release(message.channel.id);}, 1000);
			})
			.catch(() => {
				setTimeout(() => {awaitHandler.release(message.channel.id);}, 1000);
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
module.exports.settings = {
	regexp: /feed$/mi,
	tag: 'feed',
	sim: true,
	await: true,
};
