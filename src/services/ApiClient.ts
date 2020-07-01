import axios, { AxiosInstance } from 'axios'

export default class ApiClient {
  public api: AxiosInstance

  constructor(baseURL: string) {
    this.api = axios.create({ baseURL })
  }
}
