import { Command, CommandMessage, Description, Client } from '@typeit/discord'

export abstract class Help {
  @Command('help')
  @Description('Show all commands')
  async help(message: CommandMessage): Promise<void> {
    let commands = '```ini'

    Client.getCommands().forEach(command => {
      commands += `\n![${command.commandName}]: \n#${command.description}`
    })

    commands += '```'

    message.reply(commands)
  }
}
