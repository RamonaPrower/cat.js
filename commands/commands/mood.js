// imports
// exports
module.exports = {
	async execute(message, globalCat) {
		const moodString = globalCat.getMood();
		message.channel.send(`${moodString}`);
	},
};


module.exports.info = {
	name: 'Mood',
	description: 'Cats Mood',
	summon: 'mood',
};
module.exports.regexp = 'mood';
module.exports.tag = 'mood';