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
	async execute(message) {
        const react = strings.catsounds[Math.floor(Math.random() * strings.catsounds.length)];
	message.channel.send(react)
	.then(() => {
		message.channel.awaitMessages(welcome, { maxMatches: 1, time: 15000, errors: ['time'] })
		.then(async messages => {
			const userMessage = await messages.first();
			const userCat = await UserCat.create(userMessage.author.id);
			userCat.user.positive();
			message.channel.send(strings.meow.happy[Math.floor(Math.random() * strings.meow.happy.length)]);
			console.log('user positive action');
		})
		.catch(() => {
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
module.exports.regexp = '(meow|mrrp|:3|mrow|cat)';
module.exports.flags = 'gmi';
module.exports.chance = 2;
module.exports.tag = 'meow';