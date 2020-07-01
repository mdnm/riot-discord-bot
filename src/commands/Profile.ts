import { Command, CommandMessage, Description } from '@typeit/discord'

export abstract class Profile {
  @Command('profile :region :username')
  @Description('Gets the riot profile')
  async profile(message: CommandMessage): Promise<void> {
    const { region, username } = message.args
    console.log('region:', region)
    console.log('username:', username)

    message.reply('Num achei nao')

    message.channel.send('descupla :(')
  }
}
