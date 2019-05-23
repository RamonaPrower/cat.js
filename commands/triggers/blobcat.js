module.exports = {
	async execute(message) {
	message.channel.send('<a:shifty:403042127522562060>');
	},
};

module.exports.info = {
	name: 'catblob',
	description: 'reacts on a catblob emoji',
    summon: 'catblob',
};
module.exports.settings = {
	regexp: '.*blobcatheart.*',
	flags: 'gmi',
	tag: 'catblob',
	chance: 5,
};