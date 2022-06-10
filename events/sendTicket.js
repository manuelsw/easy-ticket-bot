const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu, Message } = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "ready",
    execute(message, client) {

        console.clear()
        console.log("Thanks for download this bot ❤")
        client.user.setActivity("Your Discord", { type: "WATCHING" })
        const canale = client.channels.cache.get(config.ticketChannel);

            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Ticket Assistance")
                .setDescription("Click on the button to open a ticket")
                .setThumbnail("https://cdn.discordapp.com/attachments/973609096899080202/983458726092615740/download.png")
        
            const button = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId("click")
                        .setLabel("Create a Ticket")
                        .setEmoji("📨")
                        .setStyle("PRIMARY")
                );
        
            canale.bulkDelete(100, true)
            canale.send({ embeds: [embed], components: [button] })
        
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
