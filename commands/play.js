const { Message } = require("discord.js");
const {execute} = require('../commands/join');
const ytdl = require('ytdl-core-discord');

module.exports = {
    name: 'play',
    description: 'Reproduce una cancion',
    execute(message = Message.prototype, args = ['']){
        /* if(!args[0]){
            message.channel.send('Debes colocar un link.');
            return;
        }
        let connection = execute(message, args);
        const stream = ytdl(args[0], {filter: 'audioonly'}); */
    }
}