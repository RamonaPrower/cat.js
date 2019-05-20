// imports
const strings = require('../../strings/cat.json');
// exports
module.exports = {
	async execute(message) {
        const react = strings.shout[Math.floor(Math.random() * strings.shout.length)];
        message.channel.send(react);
	},
};

module.exports.info = {
	name: 'shout',
	description: 'Reacts when there\'s shouting on the server',
	summon: 'CAPS LOCK',
};
module.exports.regexp = '^(?=[^a-z]*$)[A-Z].*[A-Z]$';
module.exports.flags = 'gm';
module.exports.tag = 'shout';