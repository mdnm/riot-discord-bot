import Discord, {MessageEmbed} from 'discord.js';
import config from './services/config.js';
import freeweekService from './services/freeweek.js';
import userinfo from './services/profile.js';

const client = new Discord.Client();


client.once('ready', async () => {

    console.log('Ready!');


});

client.on('message', async message => {

    let messageSplit = message.content.split(' ');
    let messagePrefix = messageSplit[0];

    const getArgs = ([comando, ...args]) => args;


    if (message.content === '!salve') {

        message.channel.send('dina e felps');
    }

    if (message.content === '!freeweek') {


        try {

            const returnMessages = await freeweekService();
            returnMessages.split('|').forEach(returnMessage => message.channel.send(returnMessage));


        } catch (err) {

            console.log(err);

        }

    }

    if (messagePrefix === '!profile') {

        let nick = getArgs(messageSplit).join(' ');

        try {

            const user = await userinfo(nick);
            console.log(user);

            const embedUser = new MessageEmbed()
            .setTitle(`Perfil de ${user.name}`)
            .setThumbnail(user.avatarURL)
            .setColor('#FF0000')
            .setDescription(`Summoner Level: ${user.summonerLevel} \n
                             Solo/Duo Queue Tier: ${user['1'].tier} ${user['1'].rank}
                             Winrate: ${ (user['1'].wins / ( user['1'].wins + user['1'].losses) * 100).toFixed(2) }%  \n
                             Flex Queue Tier:  ${user['0'].tier} ${user['0'].rank}
                             Winrate: ${ (user['0'].wins / ( user['0'].wins + user['0'].losses) * 100).toFixed(2) }%  \n`)

            message.channel.send(embedUser);

        } catch (err) {

            console.log(err);

            message.channel.send('Ocorreu um erro.');

        }

    }

});

client.login(config.bot_key);