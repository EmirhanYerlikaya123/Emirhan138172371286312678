const config = require("../config.json");
const db = require("quick.db");

module.exports = {
    name: "satın-al",
    aliases: ["al", "buy"],
    execute: async (client, message, args, embed, author) => {
      if (message.channel.id !== (config.channel.commandchannel)) return message.channel.send(embed.setDescription(`Bu komutu sadece <#${config.channel.commandchannel}> kanalında kullanabilirsin!`))
        const content = args[0];

        if (!content) return message.channel.send(embed.setDescription("Öncelikle geçerli bir ürün ID'si belirtmelisin!"))

        if (content === "#1") {
            if (config.shopping.prices[1] > db.fetch(`money_${author.id}`)) return message.channel.send(embed.setDescription(`#1 \`${config.shopping.product.one}\` adlı ürün \`${config.shopping.prices[1]}\` dolar olduğu için alamıyorsunuz!`));
            let ID = db.fetch(`orderno_${message.guild.id}`) + 1;
            db.add(`orderno_${message.guild.id}`, 1)
            message.channel.send(embed.setDescription(`Tebrikler \`#1 ${config.shopping.product.one}\` adlı ürünü \`${config.shopping.prices[1]}\` dolara aldınız Sipariş numarası #${ID}`));
            db.add(`money_${author.id}`, -config.shopping.prices[1]);
            db.push(`${ID}_${message.guild.id}`, `Ürün bilgisi: #1 \`${config.shopping.product.one}\`\nFiyat: \`${config.shopping.prices[1]}\`\nMüşteri: ${author}\nSipariş kimliği #${ID}`)
            db.push(`inventory_${author.id}`, `${config.shopping.product.one} Sipariş kimliği #${ID}`)
            message.guild.channels.cache.get(config.channel.log).send(`<@&${config.employee.staffroles}>`, embed.setDescription(`${author} kullanıcısı #1 numaralı ${config.shopping.product.one} adlı ürünü satın aldı!`))
        }

        if (content === "#2") {
            if (config.shopping.prices[2] > db.fetch(`money_${author.id}`)) return message.channel.send(embed.setDescription(`#2 ${config.shopping.product.two} adlı ürün ${config.shopping.prices[2]} dolar olduğu için alamıyorsunuz!`));
            let ID = db.fetch(`orderno_${message.guild.id}`) + 1;
            db.add(`orderno_${message.guild.id}`, 1)
            message.channel.send(embed.setDescription(`Tebrikler \`#2 ${config.shopping.product.two}\` adlı ürünü \`${config.shopping.prices[2]}\` dolara aldınız Sipariş numarası #${ID}`));
            db.add(`money_${author.id}`, -config.shopping.prices[2]);
            db.push(`${ID}_${message.guild.id}`, `Ürün bilgisi: #2 \`${config.shopping.product.two}\`\nFiyat: \`${config.shopping.prices[2]}\`\nMüşteri: ${author}\nSipariş kimliği #${ID}`)
            db.push(`inventory_${author.id}`, `${config.shopping.product.two} Sipariş kimliği #${ID}`)
            message.guild.channels.cache.get(config.channel.log).send(`<@&${config.employee.staffroles}>`,embed.setDescription(`${author} kullanıcısı #2 numaralı ${config.shopping.product.two} adlı ürünü satın aldı!`))
        }

        if (content === "#3") {
            if (config.shopping.prices[3] > db.fetch(`money_${author.id}`)) return message.channel.send(embed.setDescription(`#3 \`${config.shopping.product.three}\` adlı ürün \`${config.shopping.prices[3]}\` dolar olduğu için alamıyorsunuz!`));
            let ID = db.fetch(`orderno_${message.guild.id}`) + 1;
            db.add(`orderno_${message.guild.id}`, 1)
            message.channel.send(embed.setDescription(`Tebrikler \`#3 ${config.shopping.product.three}\` adlı ürünü ${config.shopping.prices[3]} dolara aldınız!`));
            db.add(`money_${author.id}`, -config.shopping.prices[3]);
            db.push(`${ID}_${message.guild.id}`, `Ürün bilgisi: #3 \`${config.shopping.product.three}\`\nFiyat: \`${config.shopping.prices[3]}\`\nMüşteri: ${author}\nSipariş kimliği #${ID}`)
            db.push(`inventory_${author.id}`, `${config.shopping.product.three} Sipariş kimliği #${ID}`)
            message.guild.channels.cache.get(config.channel.log).send(`<@&${config.employee.staffroles}>`,embed.setDescription(`${author} kullanıcısı #3 numaralı ${config.shopping.product.three} adlı ürünü satın aldı!`))
        }

        if (content === "#4") {
            if (config.shopping.prices[4] > db.fetch(`money_${author.id}`)) return message.channel.send(embed.setDescription(`#4 \`${config.shopping.product.four}\` adlı ürün \`${config.shopping.prices[4]}\` dolar olduğu için alamıyorsunuz!`));
            let ID = db.fetch(`orderno_${message.guild.id}`) + 1;
            db.add(`orderno_${message.guild.id}`, 1)
            message.channel.send(embed.setDescription(`Tebrikler \`#4 ${config.shopping.product.four}\` adlı ürünü \`${config.shopping.prices[4]}\` dolara aldınız sipariş kimliği #${ID}`));
            db.add(`money_${author.id}`, -config.shopping.prices[4]);
            db.push(`${ID}_${message.guild.id}`, `Ürün bilgisi: #4 \`${config.shopping.product.four}\`\nFiyat: \`${config.shopping.prices[4]}\`\nMüşteri: ${author}\nSipariş kimliği #${ID}`)
            db.push(`inventory_${author.id}`, `${config.shopping.product.four} Sipariş kimliği #${ID}`)
            message.guild.channels.cache.get(config.channel.log).send(`<@&${config.employee.staffroles}>`,embed.setDescription(`${author} kullanıcısı #4 numaralı ${config.shopping.product.four} adlı ürünü satın aldı!`))
        }

        if (content === "#5") {
            if (config.shopping.prices[5] > db.fetch(`money_${author.id}`)) return message.channel.send(embed.setDescription(`#5 ${config.shopping.product.five} adlı ürün ${config.shopping.prices[5]} dolar olduğu için alamıyorsunuz!`));
            let ID = db.fetch(`orderno_${message.guild.id}`) + 1;
            db.add(`orderno_${message.guild.id}`, 1)
            message.channel.send(embed.setDescription(`Tebrikler \`#5 ${config.shopping.product.five}\` adlı ürünü \`${config.shopping.prices[5]}\` dolara aldınız!`));
            db.add(`money_${author.id}`, -config.shopping.prices[5]);
            db.push(`${ID}_${message.guild.id}`, `Ürün bilgisi: #5 \`${config.shopping.product.five}\`\nFiyat: \`${config.shopping.prices[5]}\`\nMüşteri: ${author}\nSipariş kimliği #${ID}`)
            db.push(`inventory_${author.id}`, `${config.shopping.product.five} Sipariş kimliği #${ID}`)
            message.guild.channels.cache.get(config.channel.log).send(`<@&${config.employee.staffroles}>`,embed.setDescription(`${author} kullanıcısı #5 numaralı ${config.shopping.product.five} adlı ürünü satın aldı!`))
        }

        if (content === "#6") {
            if (config.shopping.prices[6] > db.fetch(`money_${author.id}`)) return message.channel.send(embed.setDescription(`#6 \`${config.shopping.product.six}\` adlı ürün \`${config.shopping.prices[6]}\` dolar olduğu için alamıyorsunuz!`));
            let ID = db.fetch(`orderno_${message.guild.id}`) + 1;
            db.add(`orderno_${message.guild.id}`, 1)
            message.channel.send(embed.setDescription(`Tebrikler \`#6 ${config.shopping.product.six}\` adlı ürünü \`${config.shopping.prices[6]}\` dolara aldınız!`));
            db.add(`money_${author.id}`, -config.shopping.prices[6]);
            db.push(`${ID}_${message.guild.id}`, `Ürün bilgisi: #6 \`${config.shopping.product.six}\`\nFiyat: \`${config.shopping.prices[6]}\`\nMüşteri: ${author}\nSipariş kimliği #${ID}`)
            db.push(`inventory_${author.id}`, `${config.shopping.product.siz} Sipariş kimliği #${ID}`)
            message.guild.channels.cache.get(config.channel.log).send(`<@&${config.employee.staffroles}>`,embed.setDescription(`${author} kullanıcısı #6 numaralı ${config.shopping.product.six} adlı ürünü satın aldı!`))
        }
    }
}  