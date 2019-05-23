// imports
// exports
module.exports = {
	async execute(message, guildSettings) {
        if (message.member.hasPermission('MANAGE_CHANNELS')) {
            if (message.content.includes('sim')) {
                await guildSettings.toggleSim(message.guild.id);
            }
            if (message.content.includes('twitter')) {
                await guildSettings.toggleTwitter(message.guild.id);
            }
            const settings = await guildSettings.getSettings(message.guild.id);
            message.author.send(`Settings for ${message.guild.name} is now, Cat Sim is ${settings.sim === true ? 'ON' : 'OFF'}, Twitter Linking is ${settings.twitter === true ? 'ON' : 'OFF'}`);
        }
        else {
            console.log('Could not run, not mod?');
        }
	},
};

module.exports.info = {
	name: 'Example',
	description: 'Layout format for Commands',
	summon: 'N/A',
};
module.exports.settings = {
	regexp: 'toggle',
	tag: 'toggle',
	guildSettings: true,
};
