// imports
const strings = require('../strings/cat.json');
const { Guild } = require('../models/guild');
const { User } = require('../models/user');
// internals
/**
 * Creates a new Cat
 * @constructor
 * @author: Ramona Prower
 * @this {Cat}
 */
class Cat {
	constructor() {
		this.mood = Math.floor(Math.random() * 10);
        /**
         * Updates to a new Random Mood
         * @this {Cat}
         */
		this.updateMood = function() {
			this.mood = Math.floor(Math.random() * 10);
		};
        /**
         * Gets the current mood
         * @this {Cat}
         * @returns {string} Emoji of mood
         */
		this.getMood = function() {
			if (this.mood <= 2) {return strings.meow.sad[Math.floor(Math.random() * strings.meow.sad.length)];}
			else if (this.mood <= 6) {return strings.meow.neutral[Math.floor(Math.random() * strings.meow.neutral.length)];}
			else {return strings.meow.happy[Math.floor(Math.random() * strings.meow.happy.length)];}
		};
	}
}
/**
 * Creates a new UserCat
 * @author Ramona Prower
 * @this {UserCat}
 * @extends {Cat}
 * @exports UserCat
 */
class UserCat extends Cat {
	constructor(search) {
		super();
		this.user = search;

	}
	/**
	 * Creates a new UserCat based on the users's id
	 * @param {snowflake} userId This is the Users snowflake, to look up in the database
	 */
	static async create(userId) {
		let search = await User.checkUser(userId);
		if (!search) {
			const user = new User({
				snowflake: userId,
			});
			await user.save();
			search = await User.checkUser(userId);
		}
		return new UserCat(search);
	}
}
/**
 * Creates a new Guild Cat
 * @author: Ramona Prower
 * @this {GuildCat}
 * @extends {Cat}
 * @exports GuildCat
 */
class GuildCat extends Cat {
	constructor(search) {
		super();
		this.hunger = search.hunger;
		this.guild = search;
	}
	/**
	 * Creates/retrieves a new Guild cat (needs to be constructed this way because of async DB lookups)
	 * @param {guildID} guildId the ID of the guild that the cat lives in
	 */
	static async create(guildId) {
		let search = await Guild.checkGuild(guildId);
		if (!search) {
			const guild = new Guild({
				snowflake: guildId,
			});
			await guild.save();
			search = await Guild.checkGuild(guildId);
		}
		await search.update();
		return new GuildCat(search);
	}
	/**
	 * Gets the Hunger of the cat after construction
	 * @returns {string} the mood, as an emoji string
	 */
	getHunger() {
		function rand(i) {
			return Math.floor(Math.random() * i);
		}
		const hungryArr = strings.hunger.yes;
		const notHungryArr = strings.hunger.no;
		const hungryStr = hungryArr[rand(hungryArr.length)];
		const notHungryStr = notHungryArr[rand(notHungryArr.length)];
		if (this.hunger <= 4) return hungryStr;
		else return notHungryStr;
	}
	/**
	 * Feeds the cat
	 * @returns {string} the mood, as an emoji string
	 */
	feed() {
		function rand(i) {
			return Math.floor(Math.random() * i);
		}
		const notHungryArr = strings.hunger.no;
		const notHungryStr = notHungryArr[rand(notHungryArr.length)];
		const fedArr = strings.fed;
		const fedStr = fedArr[rand(fedArr.length)];
		if (this.hunger > 4) {
			return notHungryStr;
		}
		else {
			this.guild.feed();
			return fedStr;
		}
	}
	/**
	 * Get whether the cat is awake or asleep
	 * @param {Object} globalCat globalcat is needed to get the accurate mood
	 * @returns {string}
	 */
	getAsleep(globalCat) {
		function rand(i) {
			return Math.floor(Math.random() * i);
		}
		const asleepArr = strings.asleep;
		const asleepStr = asleepArr[rand(asleepArr.length)];
		const moodStr = globalCat.getMood();
		if (this.guild.asleep === true) return asleepStr;
		else return moodStr;
	}
}

class GuildUserCat extends Cat {
	constructor(guildSearch, userSearch) {
		super();
		this.guild = guildSearch;
		this.user = userSearch;
	}
	/**
	 * Creates the Cat for use
	 * @param {guildID} guildId The guild ID of the message
	 * @param {userId} userId The User ID of the message
	 */
	static async create(guildId, userId) {
		let userSearch = await User.checkUser(userId);
		if (!userSearch) {
			const user = new User({
				snowflake: userId,
			});
			await user.save();
			userSearch = await User.checkUser(userId);
		}
		let guildSearch = await Guild.checkGuild(guildId);
		if (!guildSearch) {
			const guild = new Guild({
				snowflake: guildId,
			});
			await guild.save();
			guildSearch = await Guild.checkGuild(guildId);
		}
		await guildSearch.update();

		return new GuildUserCat(guildSearch, userSearch);
	}
	/**
	 * Gets a reaction to a user doing something to the cat
	 * @param {number} globalMood This is the Global Mood of the GlobalCat
	 * @param {string} action This is the action that you want to do (currently 'pet' and 'meow')
	 */
	getReaction(globalMood, action) {
		const dice = Math.floor((Math.random() * 100) + 1);
		let overallMood = globalMood + (Math.round(this.user.happiness / 2));
		let foundAction;
		if (action === 'pet') {
			foundAction = strings.pet;
		}
		else if (action === 'meow') {
			foundAction = strings.meow;
		}
		else {
			console.log('getReaction passed with improper command');
			console.log('this should never happen');
		}
		function rand(i) {
			return Math.floor(Math.random() * i);
		}
		const happyArr = foundAction.happy;
		const neutralArr = foundAction.neutral;
		const sadArr = foundAction.sad;
		const hungryArr = strings.hunger.yes;
		const asleepArr = strings.asleep;
		const asleepStr = asleepArr[rand(asleepArr.length)];
		const hungryStr = hungryArr[rand(hungryArr.length)];
		const happyStr = happyArr[rand(happyArr.length)];
		const neutralStr = neutralArr[rand(neutralArr.length)];
		const sadStr = sadArr[rand(sadArr.length)];

		if (this.guild.hunger <= 4) return hungryStr;
		if (this.guild.asleep === true && this.user.happiness <= 8) return asleepStr;
		if (globalMood <= 2) {
			overallMood--;
			overallMood--;
		}
		if (globalMood > 8) {
			overallMood++;
			overallMood++;
		}
		if (overallMood <= 0) {
			return sadStr;
		}
		if (overallMood <= 3) {
			if (dice <= 25) {
				return sadStr;
			}
			else if (dice <= 66) {
				this.user.positive();
				return neutralStr;
			}
			else {
				this.user.positive();
				return happyStr;
			}
		}
		if (overallMood <= 7) {
			if (dice <= 66) {
				this.user.positive();
				return neutralStr;
			}
			else {
				this.user.positive();
				return happyStr;
			}
		}
		if (overallMood >= 15) {
			if (dice <= 90) {
				this.user.positive();
				return '<:catlove:575816294113476608>';
			}
		}
		else {
			this.user.positive();
			return happyStr;
		}
	}
}
// exports
module.exports.Cat = Cat;
module.exports.GuildCat = GuildCat;
module.exports.UserCat = UserCat;
module.exports.GuildUserCat = GuildUserCat;
