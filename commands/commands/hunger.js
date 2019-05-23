// imports
const { GuildCat } = require('../../utils/cat');
// exports
module.exports = {
	async execute(message) {
        const guildCat = await GuildCat.create(message.guild.id);
        message.channel.send(guildCat.getHunger());
	},
};


module.exports.info = {
	name: 'Hunger',
	description: 'Cats Guild-wide hunger',
	summon: 'Hunger',
};
module.exports.settings = {
	regexp: 'hunger',
	tag: 'hunger',
	sim: true,
};
