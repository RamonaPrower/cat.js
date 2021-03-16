const strings = require('../../strings/cat.json');
const { GuildCat } = require('../../utils/cat');

module.exports = {
	async execute(message) {
        function rand(i) {
			return Math.floor(Math.random() * i);
		}
        const guildCat = await GuildCat.create(message.guild.id);
        await guildCat.wake();
        message.channel.send(strings.pspsps[rand(strings.pspsps.length)]);
        return;
	},
};

module.exports.info = {
	name: 'pspsps',
	description: 'command version of pspsps',
    summon: 'pspsps',
};
module.exports.settings = {
	regexp: /\b(ps){3,}$/mi,
	tag: 'pspsps',
	sim: true,
};