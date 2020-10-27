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
				const collector = message.channel.createMessageCollector(calming, { maxMatches: 1, time: 15000 });
				collector.on('collect', () => {
					message.channel.send(strings.calmemojis[Math.floor(Math.random() * strings.calmemojis.length)]);
				})
				collector.on('end', () => {
					setTimeout(() => { awaitHandler.release(message.channel.id); }, 1000);
				})
			});
	},
};

module.exports.info = {
	name: 'shout',
	description: 'Reacts when there\'s shouting on the server',
	summon: 'CAPS LOCK',
};
module.exports.settings = {
	regexp: /(?=[A-Z0-9]+)^[A-Z0-9\s\W]{10,}$/m,
	tag: 'shout',
	chance: 7,
	await: true,
};