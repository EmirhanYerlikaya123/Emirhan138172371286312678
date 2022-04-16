const config = require("../config.json");
const db = require("quick.db");

module.exports = {
    name: "top-coin",
    aliases: ["top"],
    execute: async (client, message, args, embed, author) => {
  
if (!message.member.roles.cache.has(config.employee.staffroles) && !message.member.hasPermission("ADMİNİSTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`))

let uye = message.mentions.users.first() || message.author;
let bilgi = db.get(`money_${uye.id}`);
  
let top = message.guild.members.cache.filter(uye => db.get(`money_${uye.id}`)).array().sort((uye1, uye2) => Number(db.get(`money_${uye2.id}`))-Number(db.get(`money_${uye1.id}`))).slice(0, 15).map((uye, index) => (index+1)+" \`•\` <@"+ uye +"> üyesi **" + db.get(`money_${uye.id}`) +"** dolara sahip.").join('\n');
message.channel.send(embed.setDescription(top));
  
}

}