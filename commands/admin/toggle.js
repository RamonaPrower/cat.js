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
            console.log(`${message.member.user.tag} tried to use an admin command, but doesn't have permission`);
        }
	},
};

module.exports.info = {
	name: 'Toggle',
	description: 'Toggle Settings on  a per-guild basis',
	summon: 'toggle',
};
module.exports.settings = {
	regexp: /toggle$/mi,
	tag: 'toggle',
	guildSettings: true,
};
