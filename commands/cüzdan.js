const config = require("../config.json");
const db = require("quick.db");

module.exports = {
    name: "cüzdan",
    aliases: ["sahip-olduklarım", "param", "banka", "para"],
    execute: async (client, message, args, embed, author, channel) => {
        channel.send(embed.setDescription(`${config.emojis.dollar} şuanda \`${db.fetch(`money_${author.id}`) || 0}\` dolarınız var!`))
    }
}