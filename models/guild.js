const mongoose = require('mongoose');
const moment = require('moment');

const guildSchema = new mongoose.Schema({
    snowflake: {
        type: String,
        required: true,
    },
    hunger: {
        type: Number,
        default: 10,
    },
    asleep: {
        type: Boolean,
        required: true,
        default: false,
    },
    lastUpdate:{
        type: Date,
        required: true,
        default: Date.now,
    },
});
guildSchema.statics.checkGuild = async function(snowflake) {
    return this.findOne({
        snowflake: snowflake,
    });
};

guildSchema.methods.update = function() {
    const timeNow = new Date();
    const diff = moment().diff(this.lastUpdate, 'hours');
    if (diff === 0) return;
    let newHunger = this.hunger - diff;
    if (newHunger < 0) newHunger = 0;
    this.hunger = newHunger;
    const dice = Math.floor(Math.random() * 101);
    if (dice <= 40) {
        this.asleep = true;
    }
    else {
        this.asleep = false;
    }
    this.lastUpdate = timeNow;
    this.save();
};

guildSchema.methods.updateHunger = function() {
    const timeNow = new Date();
    const diff = moment().diff(this.lastUpdate, 'hours');
    if (diff === 0) return;
    let newHunger = this.hunger - diff;
    if (newHunger < 0) newHunger = 0;
    this.hunger = newHunger;
    this.lastUpdate = timeNow;
    this.save();
};
guildSchema.methods.feed = function() {
    this.hunger = 10;
    this.lastUpdate = new Date();
    this.save();
};

const Guild = mongoose.model('Guild', guildSchema);
exports.Guild = Guild;