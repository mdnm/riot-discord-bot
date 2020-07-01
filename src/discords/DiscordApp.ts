import * as Path from 'path'

import { Discord, CommandNotFound, CommandMessage } from '@typeit/discord'

import * as Config from '../config/config.json'

@Discord(Config.prefix, {
  import: [
    Path.join(__dirname, '..', 'commands', '*.ts')
  ]
})
export abstract class AppDiscord {
  @CommandNotFound()
  private notFound(message: CommandMessage) {
    message.reply(`Command not found, try ${Config.prefix}help`)
  }
}
