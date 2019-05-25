// imports
const Twitter = require('twitter');
const config = require('../../config.json');
const Discord = require('discord.js');
// exports
module.exports = {
	async execute(message) {
        const tclient = new Twitter({
                consumer_key: config.ckey,
                consumer_secret: config.csecret,
                access_token_key: config.atkey,
                access_token_secret: config.atsecret,
        });
        const splitMessage = message.content.split('/');
        tclient.get('statuses/show', { id: splitMessage[splitMessage.length - 1], tweet_mode: 'extended' }, async function(error, tweets) {
            if (!error) {
                // if there's less than one image, don't post
                if (tweets.extended_entities.media.length >= 2) {
                    webhookOrMessage(tweets.extended_entities.media.slice(1), message);
                }
            }
            if (error) {
                console.log(error);
            }
        });
    },

};

async function webhookOrMessage(images, message) {
    const hook = await message.channel.fetchWebhooks();
    if (hook.size !== 0 && hook.find('name', config.webhookname)) {
        const sendHook = hook.find('name', config.webhookname);
        await sendViaHook(images, message, sendHook);

    }
    else if (!hook.find('name', config.webhookname) && message.guild.me.hasPermission('MANAGE_WEBHOOKS')) {
        const sendHook = await message.channel.createWebhook(config.webhookname, './images/twitter.png');
        await sendViaHook(images, message, sendHook);
    }
    else {
        for (const imageUrl of images) {
            const attachment = new Discord.Attachment(imageUrl.media_url);
            await message.channel.send(attachment);
        }
    }
}

async function sendViaHook(images, message, hook) {
    const data = [];
    for (const imageUrl of images) {
        data.push(imageUrl.media_url);
    }
    await hook.send(data);
}

module.exports.info = {
	name: 'Twitter',
	description: 'Twitter auto-expansion',
	summon: 'twitter link',
};
module.exports.settings = {
	// eslint-disable-next-line no-useless-escape
    regexp: 'https?:\/\/(?:mobile\.)?twitter\.com\/(?:#!\/)?(?:\w+)\/status(?:es)?\/(\d+)',
	tag: 'twitter',
};