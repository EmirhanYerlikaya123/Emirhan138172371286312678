const { Client, MessageEmbed, Collection, DiscordAPIError } = require("discord.js");
const client = new Client();
const db = require("quick.db");
const kdb = new db.table("kullanici");
const adb = new db.table("ayarlar");
const qdb = new db.table("level");
const fs = require("fs");
const moment = require("moment");
require("moment-duration-format");
const config = require("./config.json");
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();
client.cooldown = new Map();
let sended = false;

setInterval(() => {
  client.cooldown.forEach((x, index) => {
    if (Date.now() - x.lastUsage > x.cooldown) client.cooldown.delete(index);
  });
}, 5000);

setInterval(() => {
client.channels.cache.get((config.channel.chat)).send(new MessageEmbed().addField("Bunu duydun mu?").setDescription(":dollar: Unutma konuşarak sunucumuzda seviye atladıkca **DOLAR** kazanırsın!"))
}, 1000 * 60 * 30)


fs.readdirSync('./commands', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/commands/${files}]`)
    console.log(`[BORANGKDN-COMMAND] ${command.name} loaded!`);
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

client.on('message', message => {
    if (!message.guild || message.author.bot || !message.content.startsWith(config.bot.prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    const owner = client.users.cache.get("796263552771817472");
    const embed = new MessageEmbed()
        .setColor(message.member.displayHexColor)
        .setFooter((config.bot.footer), owner.avatarURL({ dynamic: true }))
        .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, size: 2048 }))
    const author = message.author
    const channel = message.channel
    if (!cmd) return
    if (cmd.owner && author.id !== config.bot.owner) return
  
   const cooldown = cmd.cooldown * 1000 || 3000;
    const cd = client.cooldown.get(message.author.id);
    if (cd) {
      const diff = Date.now() - cd.lastUsage;
      if (diff < cooldown)
          return message.channel.send(embed.setDescription(`Bu komutu tekrar kullanabilmek için **${Number(((cooldown - diff) / 1000).toFixed(2))}** daha beklemelisin!`)).then((x) => x.delete({ timeout: (cooldown - diff) }));
    } else client.cooldown.set(message.author.id, { cooldown, lastUsage: Date.now() });
    cmd.execute(client, message, args, embed, author, channel);
})

client.on("ready", () => {
    client.user.setPresence({ activity: { name: (config.bot.status), type: "PLAYING" }, status: "online" });
})

let sonMesaj = {};
client.on("message", async message => {
    if (message.author.bot || !message.guild) return;
    if (message.content.length <= 6) return;
    let ayarlar = adb.get('ayar') || {};
    if (sonMesaj[message.author.id])
        if ((Date.now() - sonMesaj[message.author.id]) / 1000 <= 2) return;
    let durum = Math.floor(Math.random() * 5);
    if (durum < 3) return;
    let xp = Math.floor(Math.random() * 5);
    let currentlyData = qdb.get("level.members." + message.author.id);
    if (!currentlyData) {
        qdb.set("level.members." + message.author.id, { Level: 0, XP: 0 });
        currentlyData = {
            Level: 0,
            XP: 0
        };
    }
    currentlyData.XP += xp;
    let nextLevel = getLevelExp(currentlyData.Level);
    if (nextLevel <= currentlyData.XP) {
        currentlyData.Level++;
        currentlyData.XP = 0;
        message.channel.send(
            `<${message.author}, Tebrikler! **${currentlyData.Level - 1}** seviyesinden **${currentlyData.Level}** seviyesine ulaştın ve bakiyene \`700\` dolar eklendi!`
        );
        db.add(`money_${message.author.id}`, 700) //para miktarını istediğiniz gibi ayarlayabilirsiniz.
    }

    qdb.set("level.members." + message.author.id, currentlyData);
    sonMesaj[message.author.id] = Date.now();
});

function getLevelExp(level) {
    return 5 * Math.pow(level, 2) + 50 * level + 100;
}

function getLevelFromExp(exp) {
    let level = 0;

    while (exp >= getLevelExp(level)) {
        exp -= getLevelExp(level);
        level++;
    }

    return level;
}

function getLevelProgress(exp) {
    let level = 0;

    while (exp >= getLevelExp(level)) {
        exp -= getLevelExp(level);
        level++;
    }

    return exp;
}   

client.login(process.env.token).then(x => console.log(`${client.user.username} olarak giriş yapıldı.`)).catch(err => console.log(`bot giriş yapamadı sebeb: ${err}.`))