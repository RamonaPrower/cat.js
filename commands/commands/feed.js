// imports
const { GuildCat } = require('../../utils/cat');
// exports
module.exports = {
	async execute(message, globalCat) {
        const guildId = message.guild.id;
        const guildCat = await GuildCat.create(guildId);
        const hunger = guildCat.feed();
        message.channel.send(hunger);
	},
};


module.exports.info = {
	name: 'Feed',
	description: 'Feed the Cat',
	summon: 'feed',
};
module.exports.regexp = 'feed';
module.exports.tag = 'feed';