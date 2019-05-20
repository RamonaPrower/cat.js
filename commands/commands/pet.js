// imports
const { UserCat } = require('../../utils/cat');
// exports
module.exports = {
	async execute(message, globalCat) {
		const userCat = await UserCat.create(message.author.id);
		message.channel.send(userCat.getReaction(globalCat.mood, 'pet'));
	},
};

module.exports.info = {
	name: 'pet cat',
	description: 'pet the cat',
	summon: 'pet',
};
module.exports.regexp = 'pet';
module.exports.tag = 'pet_cat';