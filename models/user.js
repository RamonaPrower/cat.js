const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = new mongoose.Schema({
	snowflake: {
		type: String,
		required: true,
	},
	happiness: {
		type: Number,
		default: 0,
	},
	lastReset: {
		type: Date,
		required: true,
        default: Date.now,
	},
	interactionsLeft: {
		type: Number,
		default: 3,
		required: true,
	},
});
userSchema.statics.checkUser = async function(snowflake) {
	return this.findOne({
		snowflake: snowflake,
	});
};
/**
 * Handles the positive interactions of the bot
 */
userSchema.methods.positive = async function() {
	const timeNow = new Date();
	const diff = moment().diff(this.lastReset, 'days');
	// if it's been more than a day
	if (diff >= 1) {
		// if the happiness is over 5
		if (this.happiness >= 5) {
			this.happiness = this.happiness - diff;
			// if it's now lower than 5, set it to 5
			if (this.happiness <= 5) {
				this.happiness = 5;
			}
		}
		else {
			this.happiness = this.happiness - diff;
			// if it's now lower than 0, set it to 0
			if (this.happiness < 0) {
				this.happiness = 0;
			}
		}
		this.lastReset = timeNow;
		this.interactionsLeft = 3;
	}
	if (this.happiness >= 10) return;
	if (this.interactionsLeft >= 1) {
		this.happiness++;
		this.interactionsLeft--;
	}
	await this.save();
	return;
};

const User = mongoose.model('User', userSchema);
exports.User = User;