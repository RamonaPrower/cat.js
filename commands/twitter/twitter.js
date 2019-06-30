// imports
const Twitter = require('twitter');
const config = require('../../config.json');
// exports
module.exports = {
    async execute(message) {
        const tclient = new Twitter({
            consumer_key: config.ckey,
            consumer_secret: config.csecret,
            access_token_key: config.atkey,
            access_token_secret: config.atsecret,
        });
        matchTweets(tclient, message);
        
    },

};

async function matchTweets(tclient, message) {
    const newReg = /(?<!\|\|)(?<!<)https?:\/\/(?:mobile\.)?twitter\.com\/(?:#!\/)?(?:\w+)\/status(?:es)?\/(\d+)/gmi
    const match = newReg.exec(message.content);
    if (!match[1]) { return console.log('i could\'nt find a match') }
    tclient.get('statuses/show', { id: match[1], tweet_mode: 'extended' }, async function (error, tweets) {
        if (!error) {
            handleTweet(tclient, tweets, message);

        }
        if (error) {
            console.error(`errored tweet is ${match[0]}`);
            console.error(error)
        }
    }
    );
}

async function handleTweet(tclient, tweets, message) {
    if (tweets.extended_entities) {
        if (tweets.extended_entities.media.length >= 2) {
            imgWebhookOrMessage(tweets.extended_entities.media.slice(1), message);
        }
    }
    if (tweets.is_quote_status === true) {
        console.log('i found a quote tweet');
        handleQuoteTweet(tclient, tweets, message);
    }
}

async function handleQuoteTweet(tclient, tweets, message) {
    let link = `https://twitter.com/${tweets.quoted_status.user.screen_name}/status/${tweets.quoted_status.id_str}`
    tclient.get('statuses/show', { id: tweets.quoted_status.id_str, tweet_mode: 'extended' }, function (error, tweets2) {
        if (tweets2.extended_entities) {
            if (tweets2.extended_entities.media.length >= 2) {
                link = link.concat(' ', '(extra images omitted)');
                quoteWebhookOrMessage(link, message);
                return;
            }
            else {
                quoteWebhookOrMessage(link, message);
                return;
            }
        }
        else {
            quoteWebhookOrMessage(link, message);
            return;
        }
    })
}

async function imgWebhookOrMessage(images, message) {
    if (message.guild.me.hasPermission('MANAGE_WEBHOOKS')) {
        const hook = await message.channel.fetchWebhooks();
        if (hook.size !== 0 && hook.find('name', config.webhookname)) {
            const sendHook = hook.find('name', config.webhookname);
            await imgSendViaHook(images, message, sendHook);

        }
        else if (!hook.find('name', config.webhookname)) {
            const sendHook = await message.channel.createWebhook(config.webhookname, './images/twitter.png');
            await imgSendViaHook(images, message, sendHook);
        }
        else {
            console.log('something went wrong with the webhooks');
        }
    }
    else {
        const data = [];
        for (const imageUrl of images) {
            data.push(imageUrl.media_url);
        }
        await message.channel.send(data);
    }
};

async function imgSendViaHook(images, message, hook) {
    const data = [];
    for (const imageUrl of images) {
        data.push(imageUrl.media_url);
    }
    await hook.send(data);
};

async function quoteWebhookOrMessage(link, message) {
    if (message.guild.me.hasPermission('MANAGE_WEBHOOKS')) {
        const hook = await message.channel.fetchWebhooks();
        if (hook.size !== 0 && hook.find('name', config.webhookname)) {
            const sendHook = hook.find('name', config.webhookname);
            await quoteSendViaHook(link, sendHook);

        }
        else if (!hook.find('name', config.webhookname)) {
            const sendHook = await message.channel.createWebhook(config.webhookname, './images/twitter.png');
            await quoteSendViaHook(link, sendHook);
        }
        else {
            console.log('something went wrong with the webhooks');
        }
    }
    else {
        await message.channel.send(`Found Quoted Tweet: ${link}`);
    }
};


async function quoteSendViaHook(link, hook) {
    await hook.send(`Found Quoted Tweet: ${link}`);
}

module.exports.info = {
    name: 'Twitter',
    description: 'Twitter auto-expansion',
    summon: 'twitter link',
};
module.exports.settings = {
    regexp: /(?<!\|\|)(?<!<)https?:\/\/(?:mobile\.)?twitter\.com\/(?:#!\/)?(?:\w+)\/status(?:es)?\/(\d+)/gmi,
    tag: 'twitter',
}