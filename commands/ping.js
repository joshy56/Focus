const { Message } = require("discord.js");

module.exports = {
    name: "ping",
    description: "pong!",
    execute(message = Message.prototype, args = ['']){
        message.channel.send('¡Pong!');
    },
};