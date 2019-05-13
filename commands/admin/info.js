// imports
const strings = require('../../strings/cat.json');
// exports
module.exports = {
	execute(message, globalCat) {
		message.channel.send(strings.info, { split: true });
		message.channel.send(`${globalCat.getMood()}`);
	},
};


module.exports.info = {
	name: 'Info',
	description: 'Cats info',
	summon: 'info',
};
module.exports.regexp = 'info';
module.exports.tag = 'info';