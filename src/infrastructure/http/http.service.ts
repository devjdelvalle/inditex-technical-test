import axios, { AxiosInstance } from "axios";

export class HttpService {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.BASE_URL || "https://itunes.apple.com",
      timeout: 60000,
    });

    this.client.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.client.get(url);
    return response.data;
  }
}
