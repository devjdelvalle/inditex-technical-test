export class Episode {
  constructor(
    public id: number,
    public artist: string,
    public description: string,
    public title: string,
    public date: string,
    public duration: number,
    public link: string
  ) {}

  public get durationInMinutes(): string {
    const minutes = Math.floor(this.duration / 60000);
    const seconds = parseInt(((this.duration % 60000) / 1000).toFixed(0));
    if (isNaN(minutes) || isNaN(seconds)) {
      return "";
    }
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  public get shortDate(): string {
    // convert iso date to short date
    const date = new Date(this.date);
    return date.toLocaleDateString();
  }
}
