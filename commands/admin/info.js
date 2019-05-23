// imports
const strings = require('../../strings/cat.json');
// exports
module.exports = {
	execute(message) {
		message.channel.send(strings.info, { split: true });
	},
};


module.exports.info = {
	name: 'Info',
	description: 'Cats info',
	summon: 'info',
};
module.exports.settings = {
	regexp: 'info',
	tag: 'info',
};
