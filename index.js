const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const { Cat } = require('./utils/cat');
const mongoose = require('mongoose');
const { Channel } = require('./models/channel');
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
	if (!message.isMentioned(client.user)) return;
	// pre-verification admin/info ops
	for (const key of client.admin) {
		newReg = new RegExp(key[1].regexp, 'gmi');
		if (newReg.test(message.content)) {
			console.log('found ' + key[1].info.name);
			key[1].execute(message, globalCat);
			return;
		}
	}
	// channel verification
	const search = await Channel.checkChannel(message.channel.id);
	if (!search) {
		console.log('channel not allowed');
		return;
	}
	// post-verification
	for (const key of client.commands) {
		newReg = new RegExp(key[1].regexp, 'gmi');
		if (newReg.test(message.content)) {
			console.log('found ' + key[1].info.name);
			key[1].execute(message, globalCat);
			return;
		}
	}
	const dice = Math.floor((Math.random() * 100) + 1);
	for (const key of client.triggers) {
		newReg = new RegExp(key[1].regexp, 'gmi');
		if (newReg.test(message.content)) {
			console.log('found ' + key[1].info.name);
			key[1].execute(message, globalCat);
			return;
		}
	}
});

client.on('error', data => {
	console.error('Connection Error', data.message);
});

client.login(config.token)
	.then(console.log('Logged In'))
	.catch(console.error);
