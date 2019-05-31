// imports
const strings = require('../../strings/cat.json');
// exports
module.exports = {
	async execute(message, guildSettings) {
		// send the info in the strings doc, and emoji
		message.channel.send(strings.info, { split: true });
		message.channel.send('<:meowuwu:575816294280986625>');
		// if they have higher permissions, tell them about the sim and twitter commands
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
	regexp: /info$/mi,
	tag: 'info',
	guildSettings: true,
};
