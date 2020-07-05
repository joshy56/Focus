const { Message, MessageEmbed, GuildEmoji } = require("discord.js");
const config = require('../config.json');

module.exports = {
    name: "poll",
    description: "create a poll",
    execute(message = Message.prototype, args = ['']){
        let content = args.join(' ').replace(/" "/g, ';').replace(/"/g, '').split(';');
        let embed = new MessageEmbed()
        .setTitle(content.shift());
        if(content.length > 10){
            content = content.slice(0, 10);
            message.channel.send(`El numero de opciones de tu encuesta ha sobre pasado el limite (${config.emoji.length-1})`);
        }
        let emojis = getEmojis(message, content.length);
        for(let i = 0; i < content.length; i++){
            embed.addField(emojis[i], content[i]);
        }
        message.channel.send(embed).then(async e => {
            for(const emoji of emojis){
                await e.react(emoji);
            }
        });
    },
};

module.exports = {
    getEmojis(message = Message.prototype, index = Number){
    return config.emoji.slice(0, index);
    },
};