const config = require("../config.json");
const db = require("quick.db");

module.exports = {
    name: "gönder",
    aliases: ["gönder"],
    cooldown: 3,
    execute: async (client, message, args, embed, author, channel) => {
      if (channel.id !== (config.channel.commandchannel)) return channel.send(embed.setDescription(`Bu komutu sadece <#${config.channel.commandchannel}> kanalında kullanabilirsin!`))
        const member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        const amount = args[1];
        if(!member) return message.channel.send(embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!"));
        if (author.id === member.id) return message.channel.send(embed.setDescription("Kendine para göndermek ?!"))
        if(!amount) return message.channel.send(embed.setDescription("Öncelikle geçerli bir miktar belirtmelisin!"));
        if(isNaN(amount)) return message.channel.send(embed.setDescription("Öncelikle geçerli miktar sayılardan oluşsun!"));
      if (db.get(`money_${member.id}`) < amount) return channel.send(embed.setDescription(`Maalesef ${amount} dolar gönderecek kadar paranız yok!`))
        db.add(`money_${member.id}`, amount);
        db.add(`money_${author.id}`, -amount);
        message.channel.send(embed.setDescription(`<:matthe_pzengin:875682830708015126> Başarıyla ${member} kişisine ${amount} dolar gönderdiniz şuanki dolarınız! ${db.fetch(`money_${author.id}`) || 0}`))
    }
}