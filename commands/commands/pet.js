// imports
const { User } = require('../../models/user');
// exports
module.exports = {
	async execute(message, globalCat) {
		// check if user is registered
		const userId = message.author.id;
		let search = await User.checkUser(userId);
		// if not, set at 1 and send nice
		if (!search) return search = await registerUser(userId);
		const mood = search.positive();
		// if registered, add 1 and send mood
		const moodString = globalCat.getPetReaction(mood);
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
	name: 'pet cat',
	description: 'pet the cat',
	summon: 'pet',
};
module.exports.regexp = 'pet';
module.exports.tag = 'pet_cat';