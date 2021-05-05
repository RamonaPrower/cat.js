module.exports = {
	async execute(message) {
	message.channel.send('<:meowowo:839371749228544021>');
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
	chance: 15,
};
