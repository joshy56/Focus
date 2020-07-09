const Discord = require('discord.js');
const fs = require('fs');
const package = require('./package.json');
const config = require('./config.json');
const poll = require('./commands/poll');
const client = new Discord.Client();
client.commands = new Discord.Collection([[String.prototype, String.prototype]]);
const queue = new Discord.Collection([[Discord.GuildMember.prototype, ['']]]);
module.exports = queue;

const commandsFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandsFile){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`[${package.name}] Active and registered as ${client.user.tag}`);
});

client.login(config.token);

client.on('message', message => {
    if(!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLocaleLowerCase();

    if(!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try{
        let object = config.commands.find(e => e.name === commandName);
        if(object.active){
            command.execute(message, args);
        }else{
            message.channel.send(`El comando ${object.name} no esta activo.`);
        }
    }catch(e){
        console.error(e);
        message.reply(`¡Ocurrio un error al intentar ejecutar el comando ${object.name}!`);
    }
});
