const strings = require('../../strings/cat.json');

module.exports = {
	async execute(message) {
        const react = strings.pspsps[Math.floor(Math.random() * strings.pspsps.length)];
		message.channel.send(react);
	},
};

module.exports.info = {
	name: 'pspsps',
	description: 'reacts on pspsps',
    summon: 'pspsps',
};
module.exports.settings = {
	regexp: /^(ps){3,}$/mi,
	tag: 'pspsps',
	chance: 15,
};