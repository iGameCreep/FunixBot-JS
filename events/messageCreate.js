const { EmbedBuilder, InteractionType } = require('discord.js');
const config = require('../config');
const fs = require('fs')

module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = client.config.app.prefix;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandname = args.shift().toLowerCase();
    const cmdfile = `./commands/prefix/${commandname}.js`

    const errEmbed = new EmbedBuilder()
    .setColor('#ff0000')
    .setDescription(`❌ | La commande \`${commandname}\` n'existe pas !`)

    const permEmbed = new EmbedBuilder()
    .setColor('#ff0000')
    .setDescription(`❌ | Tu n'as pas les premissions requises pour executer cette commande !`)

    if (!fs.existsSync(cmdfile)) return message.reply({ embeds: [ errEmbed ], ephemeral: true, })

    const command = require(`../commands/prefix/${commandname}`)

    if (command.permissions && !message.member.permissions.has(command.permissions) && !message.member.roles.highest.permissions.has(command.permissions)) return message.reply({ embeds: [ permEmbed ], ephemeral: true, })

    if (command.dev && !config.app.devs.includes(message.member.id)) return message.reply({ embeds: [ permEmbed ], ephemeral: true, })

    command.execute({ client, message, args });
};