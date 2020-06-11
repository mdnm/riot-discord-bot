const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => { 

    if(message.content === '!salve'){

        message.channel.send('felps e dina');

    }

})

client.login('NzIwNzYwNDczNjAzMDE0Nzk5.XuKq1A.jJRAUKl35lMUu24DTC-aFdGKnkA');