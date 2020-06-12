import Discord from 'discord.js';
import config from './services/config.js';
import freeweekService from './services/freeweek.js';

const client = new Discord.Client();


client.once('ready', async () => {

    console.log( 'Ready!' );


});

client.on('message', async message => {

    if (message.content === '!salve') {

        message.channel.send('dina e felps');
    }

    if (message.content === '!freeweek') {
        

        try{

            const returnMessages = await freeweekService();
            returnMessages.split('|').forEach(returnMessage => message.channel.send( returnMessage ) );
    
        }catch(err){
    
            console.log('unexpected error');
    
        }

    }
    
});

client.login(config.bot_key);