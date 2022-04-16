const config = require("../config.json");
const db = require("quick.db");
const money = config.workspace.addmoney.toString().includes("-") ? config.workspace.addmoney.split("-") : config.workspace.addmoney;
const min = parseInt(money[0]);
const max = parseInt(money[1]);
const amount = Array.isArray(money) ? min + Math.floor((max - min) * Math.random()) : money;

module.exports = {
    name: "çalış",
    aliases: ["workspace"],
    execute: async (client, message, args, embed, author, channel) => {
      if (message.channel.id !== (config.channel.commandchannel)) return message.channel.send(embed.setDescription(`Bu komutu sadece <#${config.channel.commandchannel}> kanalında kullanabilirsin!`))

        const presence = db.fetch(`build_${author.id}`);
        if (presence) return channel.send(embed.setDescription("Zaten şuanda çalışıyorsun!"));
        channel.send(embed.setDescription(`Tebrikler 24 saatliğine işe girdiniz\nİş bittiğinde tahmini \`${config.workspace.addmoney}\` arası dolar kazanacaksınız!`))
        db.get(`build_${author.id}`, true);
        setTimeout(() => {
            db.add(`money_${author.id}`, amount)
            channel.send(`${author}`, embed.setDescription(`Tebrikler çalıştığınız işten \`${amount}\` dolar kazandınız!`))
            db.delete(`build_${author.id}`)
        }, 1000 * 60 * 60 * 24);
    }
}