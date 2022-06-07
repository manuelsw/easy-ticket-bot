const discord = require("discord.js");
module.exports = {
    name: "rename",
    Staff: true,
    CanaleAddorRemove: true,
    execute(message, client) {
        const rename = message.content.slice(8).trim();

        const embed = new discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor("RED")
            .addField("Updated channel name", "**Name: **" + message.channel.name)


        message.channel.setName(rename);
        message.channel.send({ embeds: [embed]})

    }
}
