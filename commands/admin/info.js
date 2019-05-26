// imports
const strings = require('../../strings/cat.json');
// exports
module.exports = {
	async execute(message, guildSettings) {
		message.channel.send(strings.info, { split: true });
		message.channel.send('<:meowuwu:575816294280986625>');
		if (message.member.hasPermission('MANAGE_CHANNELS')) {
            const settings = await guildSettings.getSettings(message.guild.id);
			message.author.send(strings.admininfo, { split: true });
			message.author.send(`On ${message.guild.name}, Simulation is turned ${settings.sim === true ? 'ON' : 'OFF'}, and Twitter Auto-expansion is turned ${settings.twitter === true ? 'ON' : 'OFF'}`);
        }
	},
};


module.exports.info = {
	name: 'Info',
	description: 'Cats info',
	summon: 'info',
};
module.exports.settings = {
	regexp: /info$/gmi,
	tag: 'info',
	guildSettings: true,
};
