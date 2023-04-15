import axios, { AxiosInstance } from "axios";

export class HttpService {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.BASE_URL || "https://itunes.apple.com",
      timeout: 10000,
    });
  }

  get<T>(url: string): Promise<T> {
    return this.client.get(url).then((response) => response.data);
  }
}
