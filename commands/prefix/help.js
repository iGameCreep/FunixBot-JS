const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: "Liste toute les commandes du bot !",
    showHelp: true,
    dm_permission: true,
    category: "Informations",

    execute({ client, message, args }) {
        const commands = client.commands.filter(x => x.showHelp !== false);

        const categories = [];

        commands.forEach((command) => {
            if(!categories.includes(command.category) && command.showHelp) {
                categories.push(command.category);
            }
        });

        const embed = new EmbedBuilder()
        .setColor('#0000ff')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setDescription('Voici toute les commandes du bot !')
        
        .setTimestamp()
        .setFooter({ text: message.member.user.username, iconURL: message.member.user.displayAvatarURL({ dynamic: true })});

        categories.sort().forEach((cat, i) => {
            const tCommands = commands.filter((cmd) => cmd.category === cat);
            embed.addFields({ name:cat, value: tCommands.map((cmd) => "> `" + cmd.name + "` ➔ " + cmd.description).join("\n") });
        });


        message.reply({ embeds: [embed] });
    },
};