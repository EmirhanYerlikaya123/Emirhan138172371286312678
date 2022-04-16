const config = require("../config.json");

module.exports = {
    name: "result",
    aliases: ["içerik"],
    execute: async (client, message, args, embed) => {
      if (message.channel.id !== (config.channel.commandchannel)) return message.channel.send(embed.setDescription(`Bu komutu sadece <#${config.channel.commandchannel}> kanalında kullanabilirsin!`))
        const embedinfo = `${config.shopping.product.one}: ${config.shopping.result[1]}\n${config.shopping.product.two}: ${config.shopping.result[2]}\n${config.shopping.product.three}: ${config.shopping.result[3]}\n${config.shopping.product.four}: ${config.shopping.result[4]}\n${config.shopping.product.five}: ${config.shopping.result[5]}\n${config.shopping.product.six}: ${config.shopping.result[6]}`
        message.channel.send(embed.setDescription(`\`\`\`${embedinfo}\`\`\``))
    }
}