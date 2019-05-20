// imports
const { UserCat } = require('../../utils/cat');
// exports
module.exports = {
	async execute(message, globalCat) {
		const userCat = await UserCat.create(message.author.id);
		message.channel.send(userCat.getReaction(globalCat.mood, 'meow'));
	},
};

module.exports.info = {
	name: 'meow',
	description: 'meow',
	summon: 'meow',
};
module.exports.regexp = 'meow';
module.exports.tag = 'meow';