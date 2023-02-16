module.exports = {
    app: {
        token: 'BOT TOKEN',
        global: false,
        prefix: "!",
        guild: '161940168620638208', 
        twitchchannel: '', // Twitch notifications channel ID here
        twitchrole: '', // Twitch notifications role ID here, make sure it's pingable !
        devs: ["696753471650660412"], // Put your ID here
    },
    server: {
        port: "3000",
        ips: [ '127.0.0.1' ] // Add allowed IPs here ( for twitch notifications )
    }
};
