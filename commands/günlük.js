const config = require("../config.json");
const db = require("quick.db");
const limit = new Map()
const dailymoney = config.economy.dailymoney.toString().includes("-") ? config.economy.dailymoney.split("-") : config.economy.dailymoney;
const min = parseInt(dailymoney[0]);
const max = parseInt(dailymoney[1]);
const amount = Array.isArray(dailymoney) ? min + Math.floor((max - min) * Math.random()) : dailymoney;

module.exports = {
    name: "günlük",
    aliases: ["daily"],
    execute: async (client, message, args, embed, author, channel) => {
      if (channel.id !== (config.channel.commandchannel)) return channel.send(embed.setDescription(`Bu komutu sadece <#${config.channel.commandchannel}> kanalında kullanabilirsin!`))
        if (isNaN(amount)) return message.channel.send(embed.setDescription("Bir hata oluştu!"))
        if (1 > 0 && limit.has(author.id) && limit.get(author.id) == 1) return message.channel.send(embed.setDescription("Bu komutu yanlızca 24 saatte 1 kullanabilirsin!"));
        db.add(`money_${author.id}`, amount)
        message.channel.send(embed.setDescription(`Tebrikler, **${amount}** dolar kazandınız!`));
        if (1 > 0) {
            if (!limit.has(author.id)) limit.set(author.id, 1);
            else limit.set(author.id, limit.get(author.id) + 1);
            setTimeout(() => {
              if (limit.has(author.id)) limit.delete(author.id);
            }, 1000 * 60 * 60 * 24)
          };
    }
}