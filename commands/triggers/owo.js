module.exports = {
	async execute(message) {
	message.channel.send('<:owo:437503278926921734>');
	},
};

module.exports.info = {
	name: 'owo',
	description: 'reacts on owos and uwus',
    summon: 'owo',
};
module.exports.settings = {
	regexp: /\b(owo|uwu)\b/mi,
	tag: 'owo',
	chance: 5,
};