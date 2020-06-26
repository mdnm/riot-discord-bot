import { Command, CommandMessage, Description, Client } from '@typeit/discord'

import * as Config from '../config/config.json'

export abstract class Help {
  @Command('help')
  @Description('Show all commands')
  async help(message: CommandMessage): Promise<void> {
    let commands = '```ini'

    Client.getCommands().forEach(command => {
      commands += `\n${Config.prefix}[${command.commandName}]: \n#${command.description}`
    })

    commands += '```'

    message.reply(commands)
  }
}
