import { Command, CommandMessage, Description } from '@typeit/discord'

export abstract class Profile {
  @Command('profile :server :username')
  @Description('Gets the riot profile')
  async profile(message: CommandMessage): Promise<void> {
    const { server, username } = message.args
    console.log('server:', server)
    console.log('username:', username)

    message.reply('Num achei nao')

    message.channel.send('descupla :(')
  }
}
