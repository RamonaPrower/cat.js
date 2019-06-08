// imports
const { GuildUserCat } = require('../../utils/cat');
// exports
module.exports = {
	async execute(message, globalCat) {
		const guildUserCat = await GuildUserCat.create(message.guild.id, message.author.id);
		let resp = await guildUserCat.getReaction(globalCat.mood, 'pet');
		if (!resp) {
			resp = '<:meowhmph:575816294390038539>';
			console.log('i had an empty string return,', `mood was ${guildUserCat.user.happiness}`);
		}
		message.channel.send(resp);
	},
};

module.exports.info = {
	name: 'pet cat',
	description: 'pet the cat',
	summon: 'pet',
};
module.exports.settings = {
	regexp: /pet$/mi,
	tag: 'pet_cat',
	sim: true,
};
