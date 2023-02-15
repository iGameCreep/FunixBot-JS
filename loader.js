const { readdirSync } = require('fs');
const { Collection } = require('discord.js');

client.commands = new Collection();
CommandsArray = [];

function loadevents() {
    const events = readdirSync('./events/').filter(file => file.endsWith('.js'));

    console.log(`\nLoading events...\n`);

    for (const file of events) {
      const event = require(`./events/${file}`);
      console.log(`-> [Loaded Event] ${file.split('.')[0]}`);
      client.on(file.split('.')[0], event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
    };
}

function loadslashcmds() {
    const commands = readdirSync('./commands/slash').filter(file => file.endsWith('.js'));

    console.log(`\nLoading slash commands...\n`);

    for (const file of commands) {
        const command = require(`./commands/slash/${file}`);
        if ((command.name && command.description && command.category) || (command.name && command.description && !command.showHelp)) {
        CommandsArray.push(command);
        console.log(`-> [Loaded Command] ${command.name.toLowerCase()}`);
        client.commands.set(command.name.toLowerCase(), command);
        delete require.cache[require.resolve(`./commands/slash/${file}`)];
        } else console.log(`[Failed Command] ${command.name.toLowerCase()}`)
    };
}

function loadprefixcmds() {
    const prefixcommands = readdirSync('./commands/prefix').filter(file => file.endsWith('.js'));

    console.log(`\nLoading prefix commands...\n`);

    for (const file of prefixcommands) {
        const command = require(`./commands/prefix/${file}`);
        if ((command.name && command.description && command.category) || (command.name && command.description && !command.showHelp)) {
            console.log(`-> [Loaded Command] ${command.name.toLowerCase()}`);
            delete require.cache[require.resolve(`./commands/prefix/${file}`)];
        } else console.log(`[Failed Command] ${command.name.toLowerCase()}`)
    };
}  

function load(guildid) {
    client.guilds.cache.get(guildid).commands.set(CommandsArray)
}

module.exports.loadevents = () => loadevents()
module.exports.loadprefixcmds = () => loadprefixcmds()
module.exports.loadslashcommands = () => loadslashcmds()
module.exports.load = (guildid) => load(guildid)