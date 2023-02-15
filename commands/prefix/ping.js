const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")
const ms = require('ms')

module.exports = {
    name: 'ping',
    description: "Renvoie le ping du bot !",
    showHelp: true,
    dm_permission: true,
    category: "Informations",

    execute({ client, message }) {

        const btn = new ButtonBuilder()
        .setLabel('Refresh Ping')
        .setCustomId(JSON.stringify({ffb: `ping`}))
        .setStyle(ButtonStyle.Primary)
        .setEmoji('🏓')

        const btns = new ActionRowBuilder()
        .addComponents(btn)

        message.reply({ content: "Ping ?" }).then(msg => {
            const embed = new EmbedBuilder()
            .setTitle("Pong 🏓 !")
            .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
            .setDescription(`La latence de l'API est de ${Math.round(client.ws.ping)}ms 🛰️, Dernier ping calculé il y a ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })}.`)
            .setTimestamp()
            .setFooter({
                text: message.member.user.username ? message.member.user.username : `${message.member.user.username}#${message.member.user.discriminator}`,
                iconURL: message.member.displayAvatarURL({dynamic: true})
            })

            msg.edit({ 
                content: null, 
                embeds: [ embed ],
                components: [ btns ] 
            }) 
        })    
    },
};