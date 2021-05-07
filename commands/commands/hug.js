// imports
const { GuildUserCat, UserCat } = require('../../utils/cat');
const strings = require('../../strings/cat.json');
const huggies = response => {
    const newReg = /\b(hug!?|uppies!?|cuddles?!?)/mi;
	return newReg.test(response.content);
	};
// exports
module.exports = {
	async execute(message, awaitHandler) {
		const guildUserCat = await GuildUserCat.create(message.guild.id, message.author.id);
        const status = guildUserCat.isAsleepOrHungry();
        if (status) {
            message.channel.send(status);
        }
        else {
            message.channel.send(strings.hug[rand(strings.hug.length)])
            .then(() => {
                awaitHandler.add(message.channel.id);
                const collector = message.channel.createMessageCollector(huggies, { maxMatches: 1, time: 15000 });
                collector.on('collect', async collectedMessage => {
                    const userMessage = collectedMessage;
                        const userCat = await UserCat.create(userMessage.author.id);
                        userCat.user.positive();
                        collectedMessage.channel.send(strings.meow.happy[rand(strings.meow.happy.length)]);
                        collector.stop('true');
                        setTimeout(() => {awaitHandler.release(collectedMessage.channel.id);}, 1000);
                });
                collector.on('end', (collected, reason) => {
                    if (reason !== 'true') {
                        message.channel.send(strings.hugdeny[rand(strings.hugdeny.length)]);
                        setTimeout(() => {awaitHandler.release(message.channel.id);}, 1000);
                    }
                    return;
                });
            });
        }
	},
};
function rand(i) {
    return Math.floor(Math.random() * i);
}
module.exports.info = {
	name: 'hug',
	description: 'hug! that! meow!',
	summon: 'hug',
};
module.exports.settings = {
	regexp: /\b(hug\??|uppies\??|cuddles?\??)/mi,
	tag: 'hello',
    sim: true,
    await: true,
};
