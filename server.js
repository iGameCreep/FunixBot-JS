const express = require('express')
const { EmbedBuilder } = require("discord.js")
const config = require('./config')

const app = express()
const http = require('http').Server(app);

function responsemsg(title, message ) {
    return `<head><title>${title}</title></head><body><h1 style="text-align: center;">${message}</h1></body>`
}


module.exports = () => {
    const authorized = function(req, res, next) {
        if (req.socket.remoteAddress.startsWith('::ffff:')) ip = req.socket.remoteAddress.replace('::ffff:', '')
        else ip = req.socket.remoteAddress
        if (config.server.ips.includes(ip)) {
            return next()
        }
        res.status(401)
        res.send(responsemsg('Unauthorized', 'You are not allowed to access this.'))
    }
    
    app.get('/islive', authorized, (req, res) => {
        const name = req.query.name
        const title = req.query.title
        const game = req.query.game

        if (!name || !title || !game) {
            res.status(400)
            return res.send(responsemsg('Missing Parameters !', 'Missing parameters ! Make sure to include title, name and game !'))
        }

        const channel = client.guilds.cache.get(config.app.guild).channels.cache.get(config.app.twitchchannel)

        if (!channel) {
            res.status(500)
            return res.send(responsemsg('Invalid channel ID', 'Unable to find twitch channel, please check your config file and try again.'))
        }
    
        const embed = new EmbedBuilder()
        .setColor('Purple')
        .setTitle(`${name} est en live !`)
        .addFields([
            {
                name: "**Titre du live :**",
                value: title
            },
            {
                name: "**Jeu :**",
                value: game
            },
            {
                name: "**Lien :**",
                value: `https://twitch.tv/${name}`
            }
        ])
        .setFooter({ text: 'Notification de stream', iconURL: client.user.avatarURL() })
    
        channel.send({ content: `${name} est en live sur Twitch ! <@&${config.app.twitchrole}>`, embeds: [ embed ] })
    
        res.status(200)
        return res.send(responsemsg('Success !', `Successfully sent twitch message to ${channel.name} !`))
    })
    
    const port = config.server.port
    http.listen(port)
    
    console.log(`\n[Server] Server listening on port ${port} !\n`)
}