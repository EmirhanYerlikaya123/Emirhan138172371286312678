module.exports = {
    name: "eval",
    aliases: ["eval"],
    owner: true,
    execute: async (client, message, args, embed, author, channel) => {
        if (!args[0]) return message.channel.send(`Kod belirtilmedi!`);
        let code = args.join(' ');
        function clean(text) {
            if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
            text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
            return text;
        };
        try {
            var evaled = clean(await eval(code));
            if (evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace(client.token, "borangkdn kımse bas!!");
            message.channel.send(`${evaled.replace(client.token, "ODQwMs432MTc1OTg0MTI4.YJT7Zw.WMP93eqVOlw7lKd6Uegd8.BakAldınsuAnXsgY")}`);
        } catch (err) { message.channel.send(err, { code: "js", split: true }) };
    },
};