// imports
const { GuildUserCat } = require('../../utils/cat');
// exports
module.exports = {
	async execute(message, globalCat) {
		const guildUserCat = await GuildUserCat.create(message.guild.id, message.author.id);
		message.channel.send(guildUserCat.getReaction(globalCat.mood, 'meow'));
	},
};

module.exports.info = {
	name: 'meow',
	description: 'meow',
	summon: 'meow',
};
module.exports.settings = {
	regexp: /meow$/gmi,
	tag: 'meow',
	sim: true,
};
