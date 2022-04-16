module.exports = {
    name: "reload",
    aliases: ["r"],
    owner: true,
    execute: async (client, message, args, embed, author, channel) => {
        if (!args.length) return channel.send(embed.setDescription("Komut belirt!"))
        const commandname = args[0]
        const command = client.commands.get(commandname) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandname))
        if (!command) return channel.send(embed.setDescription(`Böyle bir komut bulunamadı (${commandname})!`))
        delete require.cache[require.resolve(`./${commandname}.js`)]
        const newcommand = require(`./${command.name}`);
        client.commands.set(command.name, newcommand);
        channel.send(embed.setDescription(`${command.name} adlı komut yenilendi!`))
    }
}