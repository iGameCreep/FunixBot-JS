const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    name: 'ip',
    description: "Récupérer l'IP du serveur Minecraft Pacifista !",
    showHelp: true,
    dm_permission: true,
    category: "Pacifista",

    execute({ client, message }) {

        const btn = new ButtonBuilder()
        .setLabel('Acceder au site web')
        .setURL('https://pacifista.fr')
        .setEmoji('🌐')
        .setStyle(ButtonStyle.Link)

        const btns = new ActionRowBuilder()
        .addComponents(btn)

        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle("Pacifista Minecraft")
        .setDescription("Serveur minecraft survie")
        .addFields([
            {
                name: "Site Web",
                value: "https://pacifista.fr",
                inline: true
            },
            {
                name: "IP de connexion",
                value: "play.pacifista.fr",
                inline: true
            },
            {
                name: "Version",
                value: "1.19.2",
                inline: true
            }
        ])

        message.reply({ content: null, embeds: [ embed ], components: [ btns ] })
        
    },
};