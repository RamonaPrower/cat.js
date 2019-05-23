// imports
// exports
module.exports = {
	async execute(message) {
	message.channel.send(':3');
	},
};

module.exports.info = {
	name: 'catface',
	description: 'reacts on a catface',
	summon: ':3c',
};
module.exports.settings = {
	regexp: ':3c?',
	flags: 'gmi',
	tag: 'catface',
	chance: 5,
};