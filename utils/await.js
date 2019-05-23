const _ = require('lodash');

/**
 * Simple Handling of awaiting message responses (prevents double posts in rare circumstances)
 */
class AwaitHandler {
    constructor() {
        this.list = new Array;
    }
    /**
     * Adds a channel to the handler
     * @param {Snowflake} channelId the Channel ID of the channel awaiting a response
     */
    add(channelId) {
        if (this.list.find(i => i === channelId)) {
            console.log('Already in handler');
        }
        else {
            this.list.push(channelId);
        }

    }
    /**
     * Removes a channel from the handler
     * @param {Snowflake} channelId the Channel ID of the channel that has finished waiting
     */
    release(channelId) {
            _.pull(this.list, channelId);
    }
    /**
     * Checks if a channel is paused
     * @param {Snowflake} channelId Returns true/false if a channel is awaiting a response
     */
    isPaused(channelId) {
        if (this.list.find(i => i === channelId)) {return true;}
        else {return false;}
    }
}
module.exports.AwaitHandler = AwaitHandler;