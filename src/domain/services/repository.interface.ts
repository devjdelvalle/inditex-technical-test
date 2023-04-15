export interface Repository<Model> {
  fetchPodcasts(): Promise<Model[]>;
  getPodcast(id: string): Promise<Model>;
}
