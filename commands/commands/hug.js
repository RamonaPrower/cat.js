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
            const userCat = await UserCat.create(userMessage.author.id);
            userCat.user.positive();
            message.channel.send(strings.hug[rand(strings.hug.length)])
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
