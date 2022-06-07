module.exports = {
    name: "developer",
    execute(message) {
        const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu, Message } = require("discord.js");

        const embed = new MessageEmbed()
            .setTitle("manelsw | The man who invented this bot")
            .setDescription(`About Him

            Ex Owner & Developer StoraxMC
            Manager for [KTG](https://discord.gg/mWBPk3Un6S)
            Developer for [Hydra Studios](https://discord.gg/XTXGpncRsV)`)

        message.channel.send({ embeds: [embed]})
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