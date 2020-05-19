// imports
// exports
module.exports = {
	async execute(message) {
	message.channel.send('<:animemeow:585568514320891925>');
	},
};

module.exports.info = {
	name: 'kawaii',
	description: 'reacts on kawaii',
	summon: 'kawaii',
};
module.exports.settings = {
	regexp: /\bkawaii+\b/mi,
	tag: 'kawaii',
	chance: 15,
};