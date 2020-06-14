import Discord, {MessageEmbed} from 'discord.js';
import config from './services/config.js';
import freeweekService from './services/freeweek.js';
import userinfo, {checkLeague} from './services/profile.js';

//global vars
const regionsArray = ['br1', 'eun1', 'euw1', 'jp1', 'kr', 'la1', 'la2', 'na1', 'oc1', 'ru', 'tr1'];

//global objects
const client = new Discord.Client();


client.once('ready', async () => {

    console.log('Ready!');

});//end of the client.once function

client.on('message', async message => {

    //splitting the message in many sections so we can have acces to the command
    let messageSplit = message.content.split(' ');

    //splitting the bot command from the arguments
    const getArgs = ([a, ...b]) => ({comando:a, args:b});

    /*
     *  List of the bot commands
     *  The prefix can be edited through the config.js file
     */

    if(message.content[0] == config.prefix){

        switch( getArgs(messageSplit).comando ){

        case config.prefix + 'salve':

            message.channel.send('dina e felps');
            return; //end of !salve

        case config.prefix + 'freeweek':

            try {

                const returnMessages = await freeweekService();
                returnMessages.split('|').forEach(returnMessage => message.channel.send(returnMessage));

            } catch (err) {

                console.log(err);

            }
            return; //end of !freeweek

        case config.prefix + 'profile':
            
            //splitting arguments so we can have access to the region
            let argumentsSplit = getArgs(messageSplit).args;

            const profileCommandArguments = ([a, ...b]) => ({region:a, nick:b});
            let nick = profileCommandArguments(argumentsSplit).nick.join(' ');
            let region = profileCommandArguments(argumentsSplit).region;

            //comparing the region sent by the user with our local array with all the regions available
            const regionCheck = regionsArray.find( item => item == region );
            
            //if our response for regionCheck is undefined then an error will happen, handling this
            if(regionCheck != undefined){
                
                try {

                    const user = await userinfo(region, nick);
                    console.log(user);
                    
                    //Using a find function to make League API easier to deal with, as they return different objects that vary
                    let infoSoloDuo = user.leagueInfo.find(item => item.queueType == 'RANKED_SOLO_5x5')
                    let infoFlex = user.leagueInfo.find(item => item.queueType == 'RANKED_FLEX_SR')


                    //Final description that goes to Discord's Embed
                    let summonerDescription = `Summoner Level: ${user.summonerLevel} \n\n` + 
                                              checkLeague(infoSoloDuo) +
                                              checkLeague(infoFlex);

                    //setting up discord embed message
                    const embedUser = new MessageEmbed()
                    .setTitle(`Perfil de ${user.name}`)
                    .setThumbnail(user.avatarURL)
                    .setColor('#FF0000')
                    .setDescription(summonerDescription)

                    message.channel.send(embedUser);

                } catch (err) {

                    console.log(err);
                    message.channel.send('Ocorreu um erro.');

                }

            } else {
                
                message.channel.send(`Região inválida, verifique se a sintaxe está correta \n` + 
                                     `${config.prefix}profile [região] [nome do invocador] \n` +
                                     `regiões disponíveis: ${regionsArray.join(', ')}`);
            
            }//end of region check

            return; //end of !profile

        default:

            message.channel.send('Comando desconhecido.');
            return;

        }   //end of switch()

    }   //end of prefix checking condition

}); //end of the client.on('message') function

client.login(config.bot_key);