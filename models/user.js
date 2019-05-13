const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	snowflake: {
		type: String,
		required: true,
	},
	happiness: {
		type: Number,
		default: 0,
	},
});
userSchema.statics.checkUser = async function(snowflake) {
	return this.findOne({
		snowflake: snowflake,
	});
};
userSchema.methods.positive = function() {
	if (this.happiness >= 10) return this.happiness;
	this.happiness++;
	this.save();
	return this.happiness;
};

const User = mongoose.model('User', userSchema);
exports.User = User;