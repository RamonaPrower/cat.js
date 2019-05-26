// imports
const { GuildUserCat } = require('../../utils/cat');
// exports
module.exports = {
	async execute(message, globalCat) {
		// to refactor, GuildUserCat isn't needed, can just be guild
		const guildUserCat = await GuildUserCat.create(message.guild.id, message.author.id);
		message.channel.send(guildUserCat.getReaction(globalCat.mood, 'mood'));
	},
};


module.exports.info = {
	name: 'Mood',
	description: 'Cats Mood',
	summon: 'mood',
};
module.exports.settings = {
	regexp: /mood$/mi,
	tag: 'mood',
	sim: true,
};
