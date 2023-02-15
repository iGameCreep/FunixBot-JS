const { EmbedBuilder, InteractionType } = require('discord.js');
const config = client.config

module.exports = (client, guild) => {
    require('../loader').load(guild.id)
};