import Discord, {MessageEmbed} from 'discord.js';
import config from './services/config.js';
import freeweekService from './services/freeweek.js';
import userinfo from './services/profile.js';

//global vars
const regionsArray = ['br1', 'eun1', 'euw1', 'na1', 'jp1', 'kr', 'la1', 'la2', 'na1', 'oc1', 'ru', 'tr1'];

//global objects
const client = new Discord.Client();


client.once('ready', async () => {

    console.log('Ready!');

});

client.on('message', async message => {

    let messageSplit = message.content.split(' ');
    let comando = messageSplit[0];

    console.log(comando);

    const getArgs = ([comando, ...args]) => args;

    /*
     *  List of the bot commands
     *  The prefix can be edited through the config.js file
     */
    

    if(message.content[0] == config.prefix){

        switch( comando ){

        case '!salve':

            message.channel.send('dina e felps');
            return;

        case '!freeweek':

            console.log('iai');

            try {

                const returnMessages = await freeweekService();
                returnMessages.split('|').forEach(returnMessage => message.channel.send(returnMessage));

                console.log('teste');

            } catch (err) {

                console.log(err);

            }//end of try/catch

            return;

        case '!profile':

            let nick = getArgs(messageSplit).join(' ');

            try {

                const user = await userinfo(nick);
                console.log(user);

                const embedUser = new MessageEmbed()
                .setTitle(`Perfil de ${user.name}`)
                .setThumbnail(user.avatarURL)
                .setColor('#FF0000')
                .setDescription(

                    `Summoner Level: ${user.summonerLevel} \n
                    Solo/Duo Queue Tier: ${user['1'].tier} ${user['1'].rank}
                    Winrate: ${ (user['1'].wins / ( user['1'].wins + user['1'].losses) * 100).toFixed(2) }%  \n
                    Flex Queue Tier:  ${user['0'].tier} ${user['0'].rank}
                    Winrate: ${ (user['0'].wins / ( user['0'].wins + user['0'].losses) * 100).toFixed(2) }%  \n`

                )

                message.channel.send(embedUser);

            } catch (err) {

                console.log(err);
                message.channel.send('Ocorreu um erro.');

            }//end of try/catch

            return;

        default:

            message.channel.send('Comando desconhecido.');
            return;

        }

    }

});

client.login(config.bot_key);