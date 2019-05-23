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
			awaitHandler.release(message.channel.id);
			message.channel.send(strings.calmemojis[Math.floor(Math.random() * strings.calmemojis.length)]);
		})
		.catch(() => {
			awaitHandler.release(message.channel.id);
			console.log('no-one consoled the cat');
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
	regexp: '^(?=[^a-z]*$)[A-Z].*[A-Z]$',
	flags: 'gm',
	tag: 'shout',
	chance: 3,
	await: true,
};