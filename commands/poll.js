const { Message, MessageEmbed } = require("discord.js");
const {emoji} = require('../config.json');

module.exports = {
    name: "poll",
    description: "Crea una encuesta",
    args: true,
    usage: '"<pregunta>" "<opcion1>" "<opcion2>" "<opcionN>"',
    execute(message = Message.prototype, args = ['']){
        const content = args.join(' ').replace(/" "/g, ';').replace(/"/g, '\u200b').replace(/\$/g, ';$').split(';');
        const title = content.shift();
        let color = getModifier(content, '$color:', 10, 'No has colocado ningun color, atributo $color ignorado.', '>=', message, 'BLUE');
        let decoration = getModifier(content, '$decorate:', 14, 'No has colocado true, atributo $decorate ignorado.', '===', message, false);

        const embed = new MessageEmbed();

        if(decoration){
            embed.setTitle(`
                ${title}
            `);
            embed.setDescription(`
                ${'~~'.padEnd(title.length, '=').concat('~~')}
            `);
        }else{
            embed.setTitle(`
                ${title}
            `);
        }

        try {
            embed.setColor(color);
        } catch (e) {
            console.error(e);
        }

        content.forEach(function (v, i) {
            if (decoration) {
                embed.addField(emoji[i], `
                    ${v}
                    ${'~~'.padEnd(v.length, '=').concat('~~')}
                `);
            }else{
                embed.addField(emoji[i], `
                    ${v}
                `);
            }
        });

        embed.setTimestamp();

        embed.setFooter(`Encuesta hecha por ${message.author.tag}`);

        try{
            message.channel.send(embed).then(e => {
                content.forEach(function (v, i){
                    e.react(emoji[i]);
                });
            });
        }catch(e){
            console.error(e);
        }

    },
};

function getModifier(array = [''], id = String, valueLength = String, errorMessage = String, operator = String, message = Message.prototype, defaultValue){
    let value = defaultValue;
    array.find(function (v, i){
        if(v.startsWith(id)){
            let value = v.trim();
            if(new Function(`${value.length.toString()} ${operator} ${valueLength}`)()){
                value = value.split(':').pop();
            }else{
                message.channel.send(errorMessage);
            }
            array.splice(i, 1);
        }
    });
    return value;
}
