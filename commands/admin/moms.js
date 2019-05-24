// imports
const strings = require('../../strings/cat.json');
// exports
module.exports = {
	async execute(message) {
        message.channel.send(strings.moms, { split: true });
		message.channel.send('<:meowuwu:575816294280986625>');
	},
};

module.exports.info = {
	name: 'Moms',
	description: 'links of creators',
	summon: '@me moms',
};
module.exports.settings = {
	regexp: 'moms',
	tag: 'moms',
};