const Discord = require('discord.js');
const config = require('./config.json');
const { Cat } = require('./utils/cat');
const { AwaitHandler } = require('./utils/await');
const mongoose = require('mongoose');
const client = new Discord.Client;
let globalCat;
const { GuildSettings } = require('./utils/guild');
const guildSettings = new GuildSettings;
const commandList = require('./commands/command');

// this is just a bunch of including the commands
// adding them dynamically is easier but SOMEONE keeps saying it's bad practice so
// this is on her
// this also makes the game easier as i can add the file for both collections needed

client.admin = new Discord.Collection();
const adminComms = commandList.admin;
for (const file of adminComms) {
	client.admin.set(file.settings.regexp, file);
}

client.commands = new Discord.Collection();
const commandsComms = commandList.commands;
for (const file of commandsComms) {
	client.commands.set(file.settings.regexp, file);
}

client.triggers = new Discord.Collection();
const triggerFiles = commandList.triggers;
for (const file of triggerFiles) {
	client.triggers.set(file.settings.regexp, file);
}

client.special = new Discord.Collection();
const specialFiles = commandList.special;
for (const file of specialFiles) {
	client.special.set(file.settings.tag, file);
}

const awaitHandler = new AwaitHandler();

client.on('ready', () => {
	console.log(`I'm up, and i'm part of ${client.guilds.size} servers`);
	const db = config.db;
	mongoose.connect(db, { useNewUrlParser: true })
		.then(() => {
			console.log('connected Succesfully to Database');
		})
		.catch(console.error);
	globalCat = new Cat();
	console.log(globalCat.mood);
	setInterval(updateCat, 3600000);
});

function updateCat() {
	globalCat.updateMood();
	console.log(globalCat.mood);
}


client.on('message', async message => {
	if (message.author.bot) return;
	let newReg;
	const mentioned = message.isMentioned(client.user);
	const thisGuildSettings = await guildSettings.getSettings(message.guild.id);

	// pre-verification admin/info ops
	if (mentioned === true) {
		for (const [key, value] of client.admin) {
			newReg = new RegExp(key, 'gm');
			if (newReg.test(message.content)) {
				// console.log('found ' + value.info.name);
				if (value.settings.guildSettings) {
					value.execute(message, guildSettings);
				}
				else {
					value.execute(message, globalCat);
				}
				return;
			}
		}
	}
	// we store a guild and last updated time in memory to save on DB updates
	// if these aren't 100% accurate, it's not the end of the world
	// i might update this to users, but i'm not all that big on it right now
	// post-verification
	if (mentioned === true) {
		for (const [key, value] of client.commands) {
			newReg = new RegExp(key, 'gmi');
			if (newReg.test(message.content)) {
				// console.log('found ' + value.info.name);
				if (!value.settings.sim || value.settings.sim === true && thisGuildSettings.sim === true) {
					if (value.settings.await) {
						value.execute(message, awaitHandler);
						return;
					}
					else {
						value.execute(message, globalCat);
						return;
					}
				}
				return;
			}
		}
	}
	const dice = 1;
	// const dice = Math.floor((Math.random() * 100) + 1);
	for (const [key, value] of client.triggers) {
		newReg = new RegExp(key, value.settings.flags);
		if (newReg.test(message.content) && dice <= value.settings.chance) {
			// console.log('found ' + value.info.name);
			if (value.settings.await) {
				if (awaitHandler.isPaused(message.channel.id) === false) {
					value.execute(message, awaitHandler);
					return;
				}
			}
			else {
				value.execute(message, globalCat);
			}
			return;
		}
	}
	if (thisGuildSettings.twitter === true) {
		newReg = new RegExp(/https?:\/\/(?:mobile\.)?twitter\.com\/(?:#!\/)?(?:\w+)\/status(?:es)?\/(\d+)/, 'gmi');
		if (newReg.test(message.content)) {
			// console.log('twitter link found');
			commandList.twitter.execute(message);
			return;
		}
	}
	if (mentioned === true && message.content === `<@${client.user.id}>`) {
		if (thisGuildSettings.sim === true) {
			client.commands.get('pet').execute(message, globalCat);
		}
		else {
			client.special.get('pet_cat').execute(message);
		}
	}
});

client.on('error', data => {
	console.error('Connection Error', data.message);
});

client.login(config.token)
	.then(console.log('Logged In'))
	.catch(console.error);
