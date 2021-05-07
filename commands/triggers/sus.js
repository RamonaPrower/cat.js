module.exports = {
	async execute(message) {
        message.channel.send('<:meowsus:821429204125745252>');
	},
};

module.exports.info = {
	name: 'when the meow is sus',
	description: 'when the meow is sus',
    summon: 'sus',
};
module.exports.settings = {
	regexp: /\bsus\b/mi,
	tag: 'sus',
	chance: 10,
};