const config = require("../config.json");
const db = require("quick.db");

module.exports = {
    name: "coin-çıkar",
    aliases: ["çıkar"],
    execute: async (client, message, args, embed, author) => {
        if (!message.member.roles.cache.has(config.employee.staffroles) && !message.member.hasPermission("ADMİNİSTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`))
        const member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        const amount = args[1];
        if(!member) return message.channel.send(embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!"));
        if(!amount) return message.channel.send(embed.setDescription("Öncelikle geçerli bir miktar belirtmelisin!"));
        if(isNaN(amount)) return message.channel.send(embed.setDescription("Öncelikle geçerli miktar sayılardan oluşsun!"));
        db.add(`money_${member.id}`, -amount);
        message.channel.send(embed.setDescription(`Başarıyla ${member} kullanıcısından **${amount}** dolar çektiniz!`))
    }
}