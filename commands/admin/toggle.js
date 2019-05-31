// imports
// exports
module.exports = {
	async execute(message, guildSettings) {
        // if they have the ability to manage channels,
        if (message.member.hasPermission('MANAGE_CHANNELS')) {
            // change sim if sim is in the message
            if (message.content.includes('sim')) {
                await guildSettings.toggleSim(message.guild.id);
            }
            // change twitter if twitter was in the message
            if (message.content.includes('twitter')) {
                await guildSettings.toggleTwitter(message.guild.id);
            }
            // send settings
            const settings = await guildSettings.getSettings(message.guild.id);
            message.author.send(`Settings for ${message.guild.name} is now, Cat Sim is ${settings.sim === true ? 'ON' : 'OFF'}, Twitter Linking is ${settings.twitter === true ? 'ON' : 'OFF'}`);
        }
        else {
            // log commands for if they don't have perms (might add a blocklist if this persists)
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
