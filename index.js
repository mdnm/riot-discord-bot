const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {

    if (message.content === '!salve') {

        message.channel.send('dina e felps');

    }

})

client.login('NzIwNzYwNDczNjAzMDE0Nzk5.XuKq1A.jJRAUKl35lMUu24DTC-aFdGKnkA');