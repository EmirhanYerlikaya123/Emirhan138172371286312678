const config = require("../config.json");
const db = require("quick.db");

module.exports = {
    name: "envanter",
    aliases: [],
    execute: async (client, message, args, embed, author,channel) => {
      if (channel.id !== (config.channel.commandchannel)) return channel.send(embed.setDescription(`Bu komutu sadece <#${config.channel.commandchannel}> kanalında kullanabilirsin!`))
        const inventory = db.fetch(`inventory_${author.id}`);
        if (!inventory) return message.channel.send(embed.setDescription("Envanteriniz'de herhangi bir ürün bulunmamakta, ürün almak istiyorsanız `!satın-al` yazınız."));
        message.channel.send(embed.setDescription((inventory.map((data, n) => `**${n + 1}.** ${data}`).join("\n"))))
    }
}