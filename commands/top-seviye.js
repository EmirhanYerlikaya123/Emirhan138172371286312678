const db = require("quick.db");
const kdb = new db.table("kullanici");
const adb = new db.table("ayarlar");
const qdb = new db.table("level");

module.exports = {
  name: "top-level",
  aliases: ["toplevel", "topxp", "top-xp"],
  execute: async (client, message, args, embed, author, channel) => {
    let top = message.guild.members.cache.filter(uye => qdb.get(`level${uye.id}`)).array().sort((uye1, uye2) => Number(qdb.get(`level${uye2.id}`))-Number(qdb.get(`level${uye1.id}`))).slice(0, 15).map((uye, index) => (index+1)+" \`•\` <@"+ uye +"> kullanıcısı **" + qdb.get(`level${uye.id}`) +"** dolara sahip.").join('\n');
message.channel.send(embed.setDescription(top));
  }
}