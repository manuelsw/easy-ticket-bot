const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "ready",
    execute(message, client) {
        console.clear()
        console.log("Thanks for download this bot ❤")
        client.user.setActivity("Your Discord", { type: "WATCHING" })
    }
}

/*
    Bot developed by: manuelsw (Hydra Studios' Owner & discord.js Developer)
    if you want donate he, donate in this link! paypal.me/tendyyx
    Contact me for support!
    For support: https://discord.gg/kkqa2uYa

    Email: manuelsw.dev@gmail.com
    Discord: manuelsw#0001
    Telegram: @manuelsw
*/ 