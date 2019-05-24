// imports
const strings = require('../../strings/cat.json');
// exports
module.exports = {
	async execute(message) {
        const coin = Math.round(Math.random);
        if (coin === 0) {
            message.channel.send(strings.pet.angry[0]);
        }
        else {
            message.channel.send(strings.pet.happy[0]);
        }
	},
};

module.exports.info = {
	name: 'pet cat',
	description: 'pet the cat',
	summon: 'pet',
};
module.exports.settings = {
	regexp: 'pet',
	tag: 'pet_cat',
};
