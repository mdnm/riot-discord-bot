const Discord = require('discord.js');
const axios = require('axios');
const freeweekService = require('./services/freeweek');

const client = new Discord.Client();


client.once('ready', () => {
    console.log( 'Ready!' );
});

client.on('message', async message => {

    if (message.content === '!salve') {
        message.channel.send('dina e felps');
    }

    if (message.content === '!freeweek') {
        
        const returnMessages = await freeweekService.returnMessage();
        returnMessages.split('|').forEach(returnMessage => message.channel.send( returnMessage ) );

    }
});

client.login('NzIwNzYwNDczNjAzMDE0Nzk5.XuKq1A.jJRAUKl35lMUu24DTC-aFdGKnkA');