// imports
const { GuildUserCat } = require('../../utils/cat');
// exports
module.exports = {
	async execute(message, globalCat) {
		const guildUserCat = await GuildUserCat.create(message.guild.id, message.author.id);
		const resp = await guildUserCat.getReaction(globalCat.mood, 'love');
		message.channel.send(resp);
	},
};

module.exports.info = {
	name: 'hello',
	description: 'say hellow to meow',
	summon: 'hello',
};
module.exports.settings = {
	regexp: /\bhello\b/mi,
	tag: 'hello',
	sim: true,
};
