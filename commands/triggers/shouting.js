// imports
const strings = require('../../strings/cat.json');
const calming = response => {
	return strings.calmphrases.some(i => {
		const newReg = new RegExp(i, 'gmi');
		return newReg.test(response.content.toLowerCase());

	});
};
// exports
module.exports = {
	async execute(message, awaitHandler) {
        const react = strings.shout[Math.floor(Math.random() * strings.shout.length)];
	message.channel.send(react)
	.then(() => {
		awaitHandler.add(message.channel.id);
		message.channel.awaitMessages(calming, { maxMatches: 1, time: 15000, errors: ['time'] })
		.then(() => {
			setTimeout(() => {awaitHandler.release(message.channel.id);}, 1000);
			message.channel.send(strings.calmemojis[Math.floor(Math.random() * strings.calmemojis.length)]);
		})
		.catch(() => {
			setTimeout(() => {awaitHandler.release(message.channel.id);}, 1000);
		});
	});
	},
};

module.exports.info = {
	name: 'shout',
	description: 'Reacts when there\'s shouting on the server',
	summon: 'CAPS LOCK',
};
module.exports.settings = {
	regexp: '^(?=[^a-z]*$)[A-Z].{14,}[A-Z]$',
	flags: 'gm',
	tag: 'shout',
	chance: 5,
	await: true,
};