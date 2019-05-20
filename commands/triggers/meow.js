// imports
const strings = require('../../strings/cat.json');
// exports
module.exports = {
	async execute(message) {
        const react = strings.catsounds[Math.floor(Math.random() * strings.catsounds.length)];
        message.channel.send(react);
	},
};

module.exports.info = {
	name: 'meow',
	description: 'Reacts to various cat sounds',
	summon: 'cat noises',
};
module.exports.regexp = '(meow|mrrp|:3|mrow|cat)';
module.exports.flags = 'gmi';
module.exports.chance = 2;
module.exports.tag = 'meow';