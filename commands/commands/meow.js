// imports
const { GuildUserCat } = require('../../utils/cat');
// exports
module.exports = {
	async execute(message, globalCat) {
		const guildUserCat = await GuildUserCat.create(message.guild.id, message.author.id);
		const resp = await guildUserCat.getReaction(globalCat.mood, 'meow');
		message.channel.send(resp);
	},
};

module.exports.info = {
	name: 'meow',
	description: 'meow',
	summon: 'meow',
};
module.exports.settings = {
	regexp: /meow$/mi,
	tag: 'meow',
	sim: true,
};
