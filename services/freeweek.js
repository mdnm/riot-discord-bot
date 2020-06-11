const axios = require('axios');

const brApi = axios.create({
    baseURL: 'https://br1.api.riotgames.com/lol/platform/v3',
});

const ddragonApi = axios.create({
    baseURL: 'http://ddragon.leagueoflegends.com/cdn/10.11.1/data/en_US/champion.json',
});

//function start
const returnMessage = async () => {

const freeWeekResponse = await brApi.get('/champion-rotations?api_key=RGAPI-46a16d95-ccce-4ced-985e-77a9215813de');
const championsResponse = await ddragonApi.get();

const freeWeek = freeWeekResponse.data;
const championsData = championsResponse.data.data;

const champions = [];
const freeWeekChampions = [];

Object.keys(championsData).forEach(function (championData) {
    champions.push(championsData[championData]);
});

for (let i = 0; i < freeWeek.freeChampionIds.length; i++) {
    champions.map((element) => {
        if (element.key == freeWeek.freeChampionIds[i]) {
            freeWeekChampions.push((({ name, title, blurb }) => ({ name, title, blurb }))(element));
        }
    });
}

let message = '';

freeWeekChampions.forEach(champion => {
    message += 'Name: ' + champion.name + '\n' + 'Title: ' + champion.title + '\n' + 'Desc.: ' + champion.blurb + '\n |';
});

return message;

}

module.exports = { returnMessage };