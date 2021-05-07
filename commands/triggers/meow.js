// imports
const strings = require('../../strings/cat.json');
const { UserCat } = require('../../utils/cat');
const welcome = response => {
	return strings.welcome.some(i => {
		const newReg = new RegExp(i, 'gmi');
		return newReg.test(response.content);
	});
};
// exports
module.exports = {
	async execute(message, awaitHandler) {
		const react = strings.catsounds[Math.floor(Math.random() * strings.catsounds.length)];
		message.channel.send(react)
			.then(() => {
				awaitHandler.add(message.channel.id);
				const collector = message.channel.createMessageCollector(welcome, { maxMatches: 1, time: 15000 });
				collector.on('collect', async newMessage => {
					const userMessage = newMessage;
					const userCat = await UserCat.create(userMessage.author.id);
					userCat.user.positive();
					await message.channel.send(strings.meow.happy[Math.floor(Math.random() * strings.meow.happy.length)]);
					collector.stop();
				});
				collector.on('end', () => {
					setTimeout(() => { awaitHandler.release(message.channel.id); }, 1000);
				});
			});
	},
};

module.exports.info = {
	name: 'meow',
	description: 'Reacts to various cat sounds',
	summon: 'cat noises',
};
module.exports.settings = {
	regexp: /\b(?:me+o+w+|cats?|ma+u+|me+w+|meor|nya+.?|miaou+|mi+a+u+|mlem|mrrr+)\b/mi,
	flags: 'gmi',
	tag: 'meow',
	chance: 9,
	await: true,
};
