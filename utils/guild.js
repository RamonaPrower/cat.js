const Discord = require('discord.js');
const { Guild } = require('../models/guild');

class GuildSettings {
    constructor() {
        this.guilds = new Discord.Collection();
    }
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
            });
            return this.guilds.get(guildId);
        }
    }
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
            });
            return this.guilds.get(guildId);
        }
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
        });
        return this.guilds.get(guildId);
    }
}

module.exports.GuildSettings = GuildSettings;