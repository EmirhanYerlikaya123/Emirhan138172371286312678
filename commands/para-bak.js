const config = require("../config.json");
const db = require("quick.db");

module.exports = {
    name: "para-bak",
    aliases: ["parası"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        const member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(!member) return message.channel.send(embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!"));
        channel.send(embed.setDescription(`${member} kullanıcısının şuanda **${db.fetch(`money_${member.id}`) || 0}** doları var!`)).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));
    }
}