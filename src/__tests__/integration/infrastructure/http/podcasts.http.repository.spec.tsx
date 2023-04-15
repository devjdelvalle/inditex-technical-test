import { HttpPodcastsRepository } from "../../../../infrastructure/http/podcasts/podcasts.http.repository";

describe("", () => {
  it("return fetchPodcasts", async () => {
    const repository = new HttpPodcastsRepository();
    const podcasts = await repository.fetchPodcasts();
    expect(podcasts).toBeDefined();
    expect(podcasts.length).toBe(100);
  });

  it("return getPodcasts", async () => {
    const repository = new HttpPodcastsRepository();
    const podcasts = await repository.fetchPodcasts();
    expect(podcasts).toBeDefined();
    expect(podcasts.length).toBe(100);
  });
});
