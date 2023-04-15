export class Podcast {
  constructor(
    private readonly id: string,
    private readonly title: string,
    private readonly author: string,
    private readonly image: string,
    private readonly description: string,
    private readonly link: string
  ) {}
}
