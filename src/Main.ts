import { Client } from '@typeit/discord'

import * as Config from './config/config.json'

export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client
  }

  static start(): void {
    this._client = new Client()

    this._client.login(
      Config['discord-token'],
      `${__dirname}/discords/*.ts`,
      `${__dirname}/discords/*.js`
    )
  }
}

Main.start()
