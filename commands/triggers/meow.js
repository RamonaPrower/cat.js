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
		message.channel.awaitMessages(welcome, { maxMatches: 1, time: 15000, errors: ['time'] })
		.then(async messages => {
			const userMessage = await messages.first();
			const userCat = await UserCat.create(userMessage.author.id);
			userCat.user.positive();
			message.channel.send(strings.meow.happy[Math.floor(Math.random() * strings.meow.happy.length)]);
			awaitHandler.release(message.channel.id);
			console.log('user positive action');
		})
		.catch(() => {
			awaitHandler.release(message.channel.id);
			console.log('no resp');
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
	regexp: '(?:me+o+w+.*|cats?|ma+u+|me+w+|meor|nya+.?|miaou+|mi+a+u+|mlem|mrrr+)',
	flags: 'gmi',
	tag: 'meow',
	chance: 6,
	await: true,
};