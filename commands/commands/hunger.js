// imports
const { GuildCat } = require('../../utils/cat');
// exports
module.exports = {
	async execute(message, globalCat) {
        const guildId = message.guild.id;
        const guildCat = await GuildCat.create(guildId);
        const hunger = guildCat.getHunger();
        message.channel.send(hunger);
	},
};


module.exports.info = {
	name: 'Hunger',
	description: 'Cats Guild-wide hunger',
	summon: 'Hunger',
};
module.exports.regexp = 'hunger';
module.exports.tag = 'hunger';