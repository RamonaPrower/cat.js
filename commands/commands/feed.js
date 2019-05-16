// imports
const { GuildCat } = require('../../utils/cat');
// exports
module.exports = {
	async execute(message) {
        const guildCat = await GuildCat.create(message.guild.id);
        message.channel.send(guildCat.feed());
	},
};


module.exports.info = {
	name: 'Feed',
	description: 'Feed the Cat',
	summon: 'feed',
};
module.exports.regexp = 'feed';
module.exports.tag = 'feed';