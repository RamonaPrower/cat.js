// imports
// exports
module.exports = {
	async execute(message, globalCat) {
		message.channel.send(globalCat.getMood());
	},
};


module.exports.info = {
	name: 'Mood',
	description: 'Cats Mood',
	summon: 'mood',
};
module.exports.regexp = 'mood';
module.exports.tag = 'mood';