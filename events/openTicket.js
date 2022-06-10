let hastebin = require("hastebin");
let num = 0000;
const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu, Message } = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {

        if (!interaction.isButton()) return;
        if (interaction.customId == "click") {
            if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {
                return interaction.reply({
                    content: 'You already have an open ticket!',
                    ephemeral: true
                });
            };

            num++
            interaction.guild.channels.create(`ticket-${num}`, {
                parent: config.parent,
                topic: interaction.user.id,
                permissionOverwrites: [{
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL'],
                    deny: ['SEND_MESSAGES']
                },
                {
                    id: config.roleSupport,
                    allow: ['VIEW_CHANNEL'],
                    deny: ['SEND_MESSAGES']
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                },
                ],
                type: 'text',
            }).then(async c => {
                interaction.reply({
                    content: `Ticket created! <#${c.id}>`,
                    ephemeral: true
                });

                const embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Select The Category")
                    .setDescription("Select category to help staff")
                const category = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId("category")
                            .setPlaceholder("Select The Category")
                            .addOptions([
                                {
                                    label: "Support",
                                    description: "If you need support, click here",
                                    value: "support",

                                },
                                {
                                    label: "Discord",
                                    description: "Need information about discord, click here",
                                    value: "discord",
                                }
                            ])
                    );

                msg = await c.send({
                    content: `<@!${interaction.user.id}>`,
                    embeds: [embed],
                    components: [category]
                });

                const collector = msg.createMessageComponentCollector({
                    componentType: 'SELECT_MENU',
                    time: 20000
                });

                collector.on('collect', i => {
                    if (i.user.id === interaction.user.id) {
                        if (msg.deletable) {
                            msg.delete().then(async () => {
                                const embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setAuthor('Ticket')
                                    .setDescription(`<@!${interaction.user.id}> created a ticket ${i.values[0]}`)
                                    .setTimestamp();

                                const row = new MessageActionRow()
                                    .addComponents(
                                        new MessageButton()
                                            .setCustomId('close-ticket')
                                            .setLabel('Close The Ticket')
                                            .setEmoji('❌')
                                            .setStyle('DANGER'),
                                    );

                                c.send({
                                    content: `<@&${config.roleSupport}>`,
                                    embeds: [embed],
                                    components: [row]
                                });
                            });
                        };

                        if (i.values[0] == "support") {
                            c.edit({
                                parent: config.parentSupport
                            })
                            c.send({
                                content: `Hello <@${interaction.user.id}>. Wait for a staffer to arrive!`
                            })
                            c.edit({
                                permissionOverwrites: [{
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL','SEND_MESSAGES']
                },
                {
                    id: config.roleSupport,
                    allow: ['VIEW_CHANNEL','SEND_MESSAGES']
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                },
                ],
                        })

                        if (i.values[0] == "discord") {
                            c.edit({
                                parent: config.parentSupport
                            })
                            c.send({
                                content: `Hello <@${interaction.user.id}>. Wait for a staffer to arrive!`
                            })
                            c.edit({
                                permissionOverwrites: [{
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL','SEND_MESSAGES']
                },
                {
                    id: config.roleSupport,
                    allow: ['VIEW_CHANNEL','SEND_MESSAGES']
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                },
                ],
                        })
                            
                        }
                    }
                })
            })

        }
        if (interaction.customId == "close-ticket") {
            const guild = client.guilds.cache.get(interaction.guildId);
            const chan = guild.channels.cache.get(interaction.channelId);

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId("confirm")
                        .setLabel("Close The Ticket")
                        .setStyle("SUCCESS"),
                    new MessageButton()
                        .setCustomId("no")
                        .setLabel("Cancel closure")
                        .setStyle("SECONDARY"),
                )
            const verif = await interaction.reply({
                content: 'Are you sure you’re closing the ticket?',
                components: [row]
            });

            const collector = interaction.channel.createMessageComponentCollector({
                componentType: 'BUTTON',
                time: 10000
            });

            collector.on('collect', i => {
                if (i.customId == 'confirm') {
                    interaction.editReply({
                        content: `Ticket closed by <@!${interaction.user.id}>`,
                        components: []
                    });

                    chan.edit({
                        name: `closed-${chan.name}`,
                        permissionOverwrites: [
                            {
                                id: client.users.cache.get(chan.topic),
                                deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
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
                    })
                        .then(async () => {
                            const embed = new MessageEmbed()
                                .setColor('6d6ee8')
                                .setTitle('Ticket')
                                .setDescription('```Ticket Control```')
                                .addField("Open By", "<@" + interaction.channel.topic + ">", false)
                                .addField("Closed By", "<@" + interaction.user.id + ">", false)
                                .setTimestamp();
                            const row = new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                        .setCustomId("delete")
                                        .setLabel("Delete Ticket")
                                        .setEmoji("❌")
                                        .setStyle("PRIMARY"),
                                    new MessageButton()
                                        .setCustomId("transcript")
                                        .setLabel("Transcript")
                                        .setEmoji("🔒")
                                        .setStyle("SECONDARY")
                                )

                            chan.send({
                                embeds: [embed],
                                components: [row]
                            });
                        });

                    collector.stop();
                };
                if (i.customId == "no") {
                    interaction.editReply({
                        content: 'Cancellation of the ticket!',
                        components: []
                    });
                    collector.stop();
                }
            });
            collector.on('end', (i) => {
                if (i.size < 1) {
                    interaction.editReply({
                        content: 'Cancellation of the ticket!',
                        components: []
                    });
                };
            });
        };

        if (interaction.customId == "delete") {
            interaction.reply("Within a few seconds the ticket will be cancelled!").then(() => {
                setTimeout(() => {
                    interaction.channel.delete()
                }, 5000)
            })
        };

        if (interaction.customId == "transcript") {
            const guild = client.guilds.cache.get(interaction.guildId);
            const chan = guild.channels.cache.get(interaction.channelId);

            chan.messages.fetch().then(async (messages) => {
                let a = messages.filter(m => m.author.bot !== true).map(m =>
                    `${new Date(m.createdTimestamp).toLocaleString('fr-FR')} - ${m.author.username}#${m.author.discriminator}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`
                ).reverse().join('\n');
                if (a.length < 1) a = "Nothing"
                hastebin.createPaste(a, {
                    contentType: 'text/plain',
                    server: 'https://hastebin.com/'
                }, {})
                    .then(function (urlToPaste) {
                        const embed = new MessageEmbed()
                            .setAuthor('Logs Ticket', "https://cdn.discordapp.com/attachments/969706076343787635/983484906267095100/avatar.png")
                            .setDescription("Ticket Information")
                            .addField("Ticket Opened by", "<@" + chan.topic + ">", false)
                            .addField("Ticket Closed by", "<@" + interaction.user.id + ">", false)
                            .addField("Transcript", `[Click Here](${urlToPaste})`)
                            .setColor('RANDOM')
                            .setTimestamp();

                        const embed2 = new MessageEmbed()
                            .setAuthor('Logs Ticket', "https://cdn.discordapp.com/attachments/969706076343787635/983484906267095100/avatar.png")
                            .setDescription("Ticket Information")
                            .addField("Ticket Opened by", "<@" + chan.topic + ">", false)
                            .addField("Ticket Closed by", "<@" + interaction.user.id + ">", false)
                            .addField("Transcript", `[Click Here](${urlToPaste})`)
                            .setColor('RANDOM')
                            .setTimestamp();

                        client.channels.cache.get(config.logsTicket).send({
                            embeds: [embed]
                        });
                        client.users.cache.get(chan.topic).send({
                            embeds: [embed2]
                        }).catch(() => { console.log('I can\'t dm him :(') });

                        interaction.channel.delete()

                    });
            });
        }
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
