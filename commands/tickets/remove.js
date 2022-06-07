const ds = require("discord.js");
const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "remove",
    Staff: true,
    CanaleAddorRemove: true,
    async execute(interaction, client) {
        const chan = client.channels.cache.get(interaction.channelId);
        const user = interaction.mentions.members?.first()
        if(!user) {
            return interaction.reply({
                content: "You have to mention a user!",
                ephemeral: true
            })
        }

        chan.edit({
            permissionOverwrites: [{
                id: user.id,
                deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
            {
                id: interaction.guild.roles.everyone,
                deny: ['VIEW_CHANNEL'],
            },
            {
                id: config.roleSupport,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
            },
            ],
        }).then(async () => {
            interaction.reply({
                content: `<@${user.id}> has been removed to the ticket!`
            });
        });

    }
}
