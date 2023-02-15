const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js")
const ms = require('ms')

module.exports = async ({ inter, queue }) => { 

    const btn = new ButtonBuilder()
    .setLabel('Refresh Ping')
    .setCustomId(JSON.stringify({ffb: `ping`}))
    .setStyle('Primary')
    .setEmoji('🏓')

    const btns = new ActionRowBuilder()
    .addComponents(btn)

    const embed = new EmbedBuilder()
    .setTitle("Pong 🏓 !")
    .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
    .setDescription(`La latence de l'API est de ${Math.round(client.ws.ping)}ms 🛰️, Dernier ping calculé il y a ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })}.`)
    .setTimestamp()
    .setFooter({
        text: inter.user.username ? inter.user.username : `${inter.user.username}#${inter.user.discriminator}`,
        iconURL: inter.user.displayAvatarURL({dynamic: true})
    })

    inter.update({ 
        content: null, 
        embeds: [ embed ],
        components: [ btns ] 
    })  
}