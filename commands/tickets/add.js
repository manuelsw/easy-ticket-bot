const ds = require("discord.js");
const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "add",
    Staff: true,
    CanaleAddorRemove: true,
    async execute(interaction, client) {
        const chan = client.channels.cache.get(interaction.channelId);
        const user = interaction.mentions.members?.first()
        if (!user) {
            return interaction.reply({
                content: "You have to mention a user!",
                ephemeral: true
            })
        }

        chan.edit({
            permissionOverwrites: [{
                id: user.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
            {
                id: config.roleSupport,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
            {
                id: interaction.guild.roles.everyone,
                deny: ['VIEW_CHANNEL'],
            },
            ],
        }).then(async () => {
            interaction.reply({
                content: `<@${user.id}> has been added to the ticket!`
            });
        });

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
