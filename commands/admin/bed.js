// imports
const { Channel } = require('../../models/channel');
// exports
module.exports = {
	async execute(message) {
		const channelID = message.channel.id;
		const search = await Channel.checkChannel(channelID);
		if (search) {
			message.channel.send('Bed already placed');
			return;
		}
		console.log('Unique ID');
		if (!message.member.hasPermission('MANAGE_CHANNELS')) return console.log('not mod');
		console.log('you have the power');
		const channel = new Channel({
			snowflake: channelID,
		});
		await channel.save();
		message.channel.send('Mrow! (Bed Placed)');
	},
};
module.exports.info = {
	name: 'Place Bed',
	description: 'Put a bed down to allow the cat to post in a channel',
	summon: 'Mention user and "place bed"',
};
module.exports.settings = {
	regexp: 'place bed',
	tag: 'place_bed',
};
