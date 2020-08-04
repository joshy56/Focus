const {Message, VoiceConnection} = require('discord.js');

module.exports = {
    name: 'join',
    description: 'Se une al canal de voz del usuario que uso este comando.',
    execute(message = Message.prototype, args = ['']){
        if(message.channel.type !== 'text') return;

        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel){
            message.reply('¡Conectate a un canal de voz antes!');
            return;
        }

        if(!voiceChannel.joinable){
            message.reply('¡No tengo los permisos necesarios para conectarme a ese canal!');
        }else{
            voiceChannel.join().then(connection => {
                message.reply('Listo, ahora usa !play <musica> para escuchar una cancion.');
                let interval = setInterval(() => {
                    message.channel.send('Abandonando el canal por inactividad.');
                    connection.disconnect();
                }, 138000);
               connection.on('speaking', e => {
                    clearInterval(interval);
               });
            });
        }
    }
}