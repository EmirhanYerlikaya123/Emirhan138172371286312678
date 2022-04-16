const config = require("../config.json");
const db = require("quick.db");

module.exports = {
    name: "sipariş-bilgi",
    aliases: ["sipariş", "order"],
    execute: async (client, message, args, embed) => {
      if (message.channel.id !== (config.channel.commandchannel)) return message.channel.send(embed.setDescription(`Bu komutu sadece <#${config.channel.commandchannel}> kanalında kullanabilirsin!`))
        if (!message.member.roles.cache.has(config.employee.staffroles) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`))
        const orderno = args[0];
        if (!orderno) return message.channel.send(embed.setDescription(`Öncelikle geçerli bir sipariş kimliği belirtmelisin!`));
        if (isNaN(orderno)) return 
        const info = db.fetch(`${orderno}_${message.guild.id}`) || "Belirttiğiniz sipariş kimliği bulunamadı!";
        message.channel.send(embed.setDescription(info))
    }
}