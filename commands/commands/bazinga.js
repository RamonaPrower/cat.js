// imports
// exports
module.exports = {
	async execute(message, globalCat) {
		message.channel.send('<:meownervous:584165009198940198>');
	},
};

module.exports.info = {
	name: 'bazinga',
	description: 'bazinga',
	summon: 'bazinga',
};
module.exports.settings = {
	regexp: /\b(bazinga|bojangles|zimbabwe|bazlooples|bazpingo|basengan)\b/mi,
	tag: 'bazinga',
	sim: true,
};
