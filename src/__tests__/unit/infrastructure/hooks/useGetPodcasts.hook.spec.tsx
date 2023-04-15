import { useGetPodcasts } from "../../../../infrastructure/hooks/useGetPodcasts.hook";
import { renderHookWithProviders } from "../../../setupTests";

describe("useGetPodcasts", () => {
  it("return podcasts", async () => {
    // getMessages.mockImplementation(() => Promise.resolve(messages));
    const { result } = renderHookWithProviders(() => useGetPodcasts());
    expect(result.current).toHaveLength(0);
  });
});
