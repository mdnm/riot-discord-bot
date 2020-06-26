import * as Path from 'path'

import { Discord, CommandNotFound, CommandMessage } from '@typeit/discord'

@Discord('!', {
  import: [
    Path.join(__dirname, '..', 'commands', '*.ts')
  ]
})
export abstract class AppDiscord {
  @CommandNotFound()
  private notFound(message: CommandMessage) {
    message.reply('Command not found, try !help')
  }
}
