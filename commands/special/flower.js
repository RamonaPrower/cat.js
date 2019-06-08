// imports
const { GuildUserCat } = require('../../utils/cat');
const strings = require('../../strings/cat.json');
const thanking = response => {
	return strings.thankyou.some(i => {
		const newReg = new RegExp(i, 'mi');
        return newReg.test(response.content.toLowerCase());
	});
};

// exports
module.exports = {
	async execute(message, awaitHandler) {
        message.channel.send('<:meowflower:586793051729428481>')
        .then(async () => {
            const guildUserCat = await GuildUserCat.create(message.guild.id, message.author.id);
            awaitHandler.add(message.author.id);
            message.channel.awaitMessages(thanking, { maxMatches: 1, time: 15000, errors: ['time'] })
            .then(() => {
                message.channel.send(strings.meow.happy[Math.floor(Math.random() * strings.meow.happy.length)]);
                guildUserCat.user.positive();
                setTimeout(() => {awaitHandler.release(message.author.id);}, 1000);
            })
            .catch(() => {
                setTimeout(() => {awaitHandler.release(message.author.id);}, 1000);
            });
        });

    },
    async isFlowerTime(message) {
        const guildUserCat = await GuildUserCat.create(message.guild.id, message.author.id);
        const status = guildUserCat.isAsleepOrHungry();
        if (status) {
            return false;
        }
        if (guildUserCat.user.happiness <= 7) {
            return false;
        }
        else {
            return true;
        }
    },
};

module.exports.info = {
	name: 'flower',
	description: 'Offer a flower to someone',
	summon: 'automatically',
};
module.exports.settings = {
	regexp: 'flower',
	tag: 'flower',
};
