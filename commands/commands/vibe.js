const strings = require('../../strings/cat.json');

module.exports = {
	async execute(message) {
        function rand(i) {
			return Math.floor(Math.random() * i);
		}
        message.channel.send(strings.vibe[rand(strings.vibe.length)]);
        return;
	},
};

module.exports.info = {
	name: 'Vibe Check',
	description: 'checking meow\'s vibes',
    summon: 'vibe check',
};
module.exports.settings = {
	regexp: /vibe check$/mi,
	tag: 'vibe',
	sim: true,
};