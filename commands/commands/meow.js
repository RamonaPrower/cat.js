// imports
const { User } = require('../../models/user');
// exports
module.exports = {
	async execute(message, globalCat) {
		// check if user is registered
		const userId = message.author.id;
		let search = await User.checkUser(userId);
		// if not, create
		if (!search) search = await registerUser(userId);
		const mood = search.happiness;
		// if registered send mood
		const moodString = globalCat.getMeowReaction(mood);
		message.channel.send(`${moodString}`);
	},
};

async function registerUser(userID) {
	const user = new User({
		snowflake: userID,
	});
	await user.save();
	return await User.checkUser(userID);
}

module.exports.info = {
	name: 'meow',
	description: 'meow',
	summon: 'meow',
};
module.exports.regexp = 'meow';
module.exports.tag = 'meow';