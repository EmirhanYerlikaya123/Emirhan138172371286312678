const db = require("quick.db");
const Discord = require("discord.js")
const config = require("../config.json");

module.exports = {
    name: "yardım",
    aliases: ["y"],
    owner: true,
    execute: async (client, message, args, embed, author, channel) => {
        message.channel.send(embed
            .setDescription(`Aşşağıda botun kullanılabilir tüm komutları yer alıyor. Sorununuz olursa üst yetkililere ulaşınız!

**!bahis** - bahis oynarsınız.
**!cüzdan** - parana bakarsın.
**!parası** - herhangi bir kullanıcının parasına bakarsın.
**!envanter** - envanterine bakarsın.
**!içerik** - içerikler hakkında bilgi alırsınız.
**!market** - ürünlerin ücretini görürsünüz.
**!satın-al** - ürün id belirterek satın alırsınız.
**!seviye** - seviyenize bakarsınız.
**!çalış** - 24 saat boyunca çalışırsınız.

İyi eğlenceler. :tada:`))
    }
}