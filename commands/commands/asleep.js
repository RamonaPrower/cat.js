// imports
const { GuildCat } = require('../../utils/cat');
// exports
module.exports = {
	async execute(message, globalCat) {
        const guildCat = await GuildCat.create(message.guild.id);
        const reaction = guildCat.getAsleep(globalCat);
        message.channel.send(reaction);
	},
};

module.exports.info = {
	name: 'Asleep',
	description: 'Finding out if the cat is asleep',
	summon: 'asleep',
};
module.exports.settings = {
	regexp: 'asleep',
	tag: 'asleep',
	sim: true,
};
