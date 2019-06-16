const Discord = require('discord.js');
const { Guild } = require('../models/guild');

/**
 * The Settings Handler of each Guild
 * This stores the settings in memory to save on DB queries
 * @constructor
 * @author Ramona Prower
 * @this {GuildSettings}
 */
class GuildSettings {
    constructor() {
        this.guilds = new Discord.Collection();
    }
    /**
     * Gets the settings of the guild supplied, via ID
     * @param {Snowflake} guildId The Guild ID
     */
    async getSettings(guildId) {
        if (this.guilds.get(guildId)) {
            return this.guilds.get(guildId);
        }
        else {
            let search = await Guild.checkGuild(guildId);
            if (!search) {
                const guild = new Guild({
                    snowflake: guildId,
                });
                await guild.save();
                search = await Guild.checkGuild(guildId);
            }
            await search.update();
            this.guilds.set(guildId, {
                sim: search.enableSim,
                twitter: search.enableTwitter,
                shouting: search.enableShouting,
            });
            return this.guilds.get(guildId);
        }
    }
    /**
     * Toggles the Sim Setting on the server
     * @param {Snowflake} guildId The Guild ID
     */
    async toggleSim(guildId) {
            const search = await Guild.checkGuild(guildId);
            if (search.enableSim === true) {
                search.enableSim = false;
            }
            else {
                search.enableSim = true;
            }
            await search.save();
            this.guilds.set(guildId, {
                sim: search.enableSim,
                twitter: search.enableTwitter,
                shouting: search.enableShouting,
            });
            return this.guilds.get(guildId);
        }
        /**
         * Toggles the Twitter support on the server
         * @param {Snowflake} guildId The guild ID
         */
    async toggleTwitter(guildId) {
        const search = await Guild.checkGuild(guildId);
        if (search.enableTwitter === true) {
            search.enableTwitter = false;
        }
        else {
            search.enableTwitter = true;
        }
        await search.save();
        this.guilds.set(guildId, {
            sim: search.enableSim,
            twitter: search.enableTwitter,
            shouting: search.enableShouting,
        });
        return this.guilds.get(guildId);
    }
    /**
     * Toggles the shouting command on a server
     * @param {Snowflake} guildId The guild ID
     */
    async toggleShouting(guildId) {
        const search = await Guild.checkGuild(guildId);
        if (search.enableShouting === true) {
            search.enableShouting = false;
        }
        else {
            search.enableShouting = true;
        }
        await search.save();
        this.guilds.set(guildId, {
            sim: search.enableSim,
            twitter: search.enableTwitter,
            shouting: search.enableShouting,
        });
        return this.guilds.get(guildId);
    }
}

module.exports.GuildSettings = GuildSettings;