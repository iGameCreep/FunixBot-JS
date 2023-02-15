const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")
const ms = require('ms')

module.exports = {
    name: 'ping',
    description: "Renvoie le ping du bot !",
    showHelp: true,
    dm_permission: true,
    category: "Informations",

    execute({ client, inter }) {

        const btn = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Refresh Ping')
            .setCustomId(JSON.stringify({ffb: `ping`}))
            .setStyle(ButtonStyle.Primary)
            .setEmoji('🏓')
        )

        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle("Pong 🏓 !")
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .setDescription(`La latence de l'API est de ${Math.round(client.ws.ping)}ms 🛰️, Dernier ping calculé il y a ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })}.`)
        .setTimestamp()
        .setFooter({
            text: inter.user.username ? inter.user.username : `${inter.user.username}#${inter.user.discriminator}`,
            iconURL: inter.user.displayAvatarURL({dynamic: true})
        })

        inter.deferReply().then(() => {
            inter.editReply({ 
                content: null, 
                embeds: [ embed ],
                components: [ btn ] 
            })
        }) 
    },
};