const { EmbedBuilder, InteractionType } = require('discord.js');
const config = client.config

module.exports = (client, inter) => {
    if (inter.type === InteractionType.ApplicationCommand) {
        const command = client.commands.get(inter.commandName);

        const errEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setDescription('❌ | Une erreur est survenue ! Réessaie plus tard.')

        const permEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setDescription(`❌ | Tu n'as pas les premissions pour executer cette commande !`)

        if (!command) return inter.reply({ embeds: [ errEmbed ], ephemeral: true, }), client.slash.delete(inter.commandName)

        if (command.permissions && !inter.member.permissions.has(command.permissions)) return inter.reply({ embeds: [ permEmbed ], ephemeral: true, })

        if (command.dev && !config.app.devs.includes(inter.member.id)) return inter.reply({ embeds: [ permEmbed ], ephemeral: true, })

        command.execute({ inter, client });
    }
    if (inter.type === InteractionType.MessageComponent) {
        const customId = JSON.parse(inter.customId)
        const file_of_button = customId.ffb

        if (file_of_button) {
            delete require.cache[require.resolve(`../buttons/${file_of_button}.js`)];
            const button = require(`../buttons/${file_of_button}.js`)
            if (button) return button({ client, inter, customId });
        }
    }
};