import { Client } from '@typeit/discord'

export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client
  }

  static start(): void {
    this._client = new Client()

    // In the login method, you must specify the glob string to load your classes (for the framework).
    // In this case that's not necessary because the entry point of your application is this file.
    this._client.login(
      'NzIwNzYwNDczNjAzMDE0Nzk5.XuKq1A.jJRAUKl35lMUu24DTC-aFdGKnkA',
      `${__dirname}/discords/*.ts`, // glob string to load the classes
      `${__dirname}/discords/*.js` // If you compile your bot, the file extension will be .js
    )
  }
}

Main.start()
