const db = require("quick.db");
const kdb = new db.table("kullanici");
const adb = new db.table("ayarlar");
const qdb = new db.table("level");
const config = require("../config.json");
module.exports = {
    name: "seviye-bak",
    aliases: ["level-bak", "xp-bak", "lvl-bak", "rank-bak"],
    execute: async (client, message, args, embed, author) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return;
        let data = qdb.get("level.members");
        if (!data)
            data = qdb.set("level.members", {});
        let udata = data[user.id];
        if (!udata) {
            udata = qdb.set("level.members." + user.id, {
                Level: 0,
                XP: 0
            });
            udata = {
                Level: 0,
                XP: 0
            };
            data[user.id] = udata;
        }
        let s覺r = Object.keys(data);
        let s覺ralama = s覺r.sort((a, b) => (getLevelExp(data[b].Level) + data[b].XP) - (getLevelExp(data[a].Level) + data[a].XP)).indexOf(user.id) + 1;
        message.channel.send(embed
            .setDescription(`??圻 ${user} kullan覺c覺s覺n覺n ${udata.Level}. seviye, ${udata.XP} tecr羹be puan覺 var!`)
            .addField("Sonraki Seviye", `??圻 ${getLevelExp(udata.Level++) - udata.XP} XP sonra`, true))
    }
}

function getLevelExp(level) {
    return 5 * Math.pow(level, 2) + 50 * level + 100;
}