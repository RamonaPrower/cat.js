// imports
const { GuildUserCat } = require('../../utils/cat');
const strings = require('../../strings/cat.json');
// exports
module.exports = {
	async execute(message, globalCat) {
		function rand(i) {
			return Math.floor(Math.random() * i);
		}
		if (message.content.includes('i would die for')) {
			message.channel.send(strings.die[rand(strings.die.length)]);
			return;
		}
		const guildUserCat = await GuildUserCat.create(message.guild.id, message.author.id);
		const resp = await guildUserCat.getReaction(globalCat.mood, 'love');
		message.channel.send(resp);
	},
};

module.exports.info = {
	name: 'love',
	description: 'when someone loves meow',
	summon: 'love',
};
module.exports.settings = {
	regexp: /(\blove|i would die for|cute)/mi,
	tag: 'love',
	sim: true,
};
