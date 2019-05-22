// imports
const { GuildUserCat } = require('../../utils/cat');
// exports
module.exports = {
	async execute(message, globalCat) {
		const guildUserCat = await GuildUserCat.create(message.guild.id, message.author.id);
		message.channel.send(guildUserCat.getReaction(globalCat.mood, 'pet'));
	},
};

module.exports.info = {
	name: 'pet cat',
	description: 'pet the cat',
	summon: 'pet',
};
module.exports.regexp = 'pet';
module.exports.tag = 'pet_cat';