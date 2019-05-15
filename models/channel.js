const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    snowflake: {
        type: String,
        required: true,
    },
});
channelSchema.statics.checkChannel = async function(snowflake) {
    return this.findOne({
        snowflake: snowflake,
    });
};

const Channel = mongoose.model('Channel', channelSchema);
exports.Channel = Channel;