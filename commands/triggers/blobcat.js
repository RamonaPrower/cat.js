module.exports = {
	async execute(message) {
	message.channel.send('<:catblobheart:405242612681801739>');
	},
};

module.exports.info = {
	name: 'catblob',
	description: 'reacts on a catblob emoji',
    summon: 'catblob',
};
module.exports.settings = {
	regexp: /.*blobcatheart.*/gmi,
	tag: 'catblob',
	chance: 5,
};