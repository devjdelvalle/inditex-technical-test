export class Podcast {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly author: string,
    readonly image: string,
    readonly description: string,
    readonly link: string
  ) {}
}
