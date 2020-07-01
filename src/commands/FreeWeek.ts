import { MessageEmbed } from 'discord.js'

import { Command, CommandMessage, Description } from '@typeit/discord'

import * as Config from '../config/config.json'
import ApiClient from '../services/ApiClient'

export abstract class Profile {
  @Command('freeweek :region')
  @Description('Gets the current freeweek champion rotation')
  async freeweek(message: CommandMessage): Promise<void> {
    const { region } = message.args

    const regionApiClient = new ApiClient('https://br1.api.riotgames.com/lol/platform/v3')
    const ddragonApiClient = new ApiClient('http://ddragon.leagueoflegends.com/cdn/10.13.1/')
    const freeWeekResponse = await regionApiClient.api.get('/champion-rotations?api_key=' + Config['riot-token'])
    const championsResponse = await ddragonApiClient.api.get('data/en_US/champion.json')

    const freeWeek = freeWeekResponse.data
    const championsData = championsResponse.data.data

    const champions = []
    const freeWeekChampions = []

    Object.keys(championsData).forEach(function (championData) {
      champions.push(championsData[championData])
    })

    for (let i = 0; i < freeWeek.freeChampionIds.length; i++) {
      champions.map((element) => {
        // eslint-disable-next-line eqeqeq
        if (element.key == freeWeek.freeChampionIds[i]) {
          freeWeekChampions.push((({ id, name, title, blurb }) => ({ id, name, title, blurb }))(element))
        }
      })
    }

    const embedMessages = []

    freeWeekChampions.forEach(champion => {
      embedMessages.push(new MessageEmbed()
        .setTitle(`${champion.name} - ${champion.title}`)
        .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/10.13.1/img/champion/${champion.id}.png`)
        .setColor('#FF0000')
        .setDescription(champion.blurb)
      )
    })

    embedMessages.forEach(embedMessage => message.channel.send(embedMessage))
  }
}
