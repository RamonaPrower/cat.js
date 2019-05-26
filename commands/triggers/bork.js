module.exports = {
	async execute(message) {
	message.channel.send('<a:shifty:403042127522562060>');
	},
};

module.exports.info = {
	name: 'bork',
	description: 'reacts on a bark',
	summon: ':3c',
};
module.exports.settings = {
	regexp: /\b(bo*rk|bjork)\b/gmi,
	flags: 'gmi',
	tag: 'bork',
	chance: 5,
};