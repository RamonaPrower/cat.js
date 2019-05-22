const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const { Cat } = require('./utils/cat');
const mongoose = require('mongoose');
const { Channel } = require('./models/channel');
const moment = require('moment');
const client = new Discord.Client;
let globalCat;

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/commands/${file}`);
	client.commands.set(command.tag, command);
}

client.admin = new Discord.Collection();
const adminFiles = fs.readdirSync('./commands/admin').filter(file => file.endsWith('.js'));
for (const file of adminFiles) {
	const admin = require(`./commands/admin/${file}`);
	client.admin.set(admin.tag, admin);
}

client.triggers = new Discord.Collection();
const triggerFiles = fs.readdirSync('./commands/triggers').filter(file => file.endsWith('.js'));
for (const file of triggerFiles) {
	const trigger = require(`./commands/triggers/${file}`);
	client.triggers.set(trigger.tag, trigger);
}
client.superadmin = new Discord.Collection();
const superAdminFiles = fs.readdirSync('./commands/superadmin').filter(file => file.endsWith('.js'));
for (const file of superAdminFiles) {
	const superAdmin = require(`./commands/superadmin/${file}`);
	client.superadmin.set(superAdmin.tag, superAdmin);
}

const guildUpdate = new Discord.Collection();

client.on('ready', () => {
	console.log(`I'm up, and i'm part of ${client.guilds.size} servers`);
	const db = config.db;
	mongoose.connect(db, { useNewUrlParser: true })
		.then(() => {
			console.log(`connected Succesfully to ${db}`);
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

	// pre-verification admin/info ops
	if (mentioned === true) {
		for (const key of client.admin) {
			newReg = new RegExp(key[1].regexp, 'gm');
			if (newReg.test(message.content)) {
				console.log('found ' + key[1].info.name);
				key[1].execute(message, globalCat);
				return;
			}
		}
	}

	// channel + guild verification
	const search = await Channel.checkChannel(message.channel.id);
	if (!search) {
		console.log('channel not allowed');
		return;
	}
	const guildId = message.guild.id;
	const timeNow = new Date();
	// we store a guild and last updated time in memory to save on DB updates
	// if these aren't 100% accurate, it's not the end of the world
	// i might update this to users, but i'm not all that big on it right now
	if (guildUpdate.has(guildId)) {
		const guildUpdateTime = guildUpdate.get(guildId);
		const diff = moment().diff(guildUpdateTime, 'hours');
		if (diff === 0) {
			console.log('no update needed');
		}
		// do update stuff when i build the command
		else {
		console.log('update time');
		guildUpdate.set(guildId, timeNow);
		}

	}
	else {
		console.log('created Guild in volmem');
		guildUpdate.set(guildId, timeNow);
	}
	// post-verification
	if (mentioned === true) {
		for (const key of client.commands) {
			newReg = new RegExp(key[1].regexp, 'gmi');
			if (newReg.test(message.content)) {
				console.log('found ' + key[1].info.name);
				guildUpdate.set(message.guild.id, new Date());
				key[1].execute(message, globalCat);
				return;
			}
		}
	}
	const dice = 1;
	// const dice = Math.floor((Math.random() * 100) + 1);
	for (const key of client.triggers) {
		newReg = new RegExp(key[1].regexp, key[1].flags);
		if (newReg.test(message.content) && dice <= key[1].chance) {
			console.log('found ' + key[1].info.name);
			key[1].execute(message, globalCat);
			return;
		}
	}
	if (message.author.id === '132351312141484033' && mentioned === true) {
		for (const key of client.superadmin) {
			newReg = new RegExp(key[1].regexp, 'gmi');
			if (newReg.text(message.content)) {
				console.log('found ' + key[1].info.name);
				key[1].execute(message, globalCat);
			}
		}
	}
});

client.on('error', data => {
	console.error('Connection Error', data.message);
});

client.login(config.token)
	.then(console.log('Logged In'))
	.catch(console.error);
