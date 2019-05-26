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
	regexp: /owo|uwu/mi,
	tag: 'owo',
	chance: 5,
};