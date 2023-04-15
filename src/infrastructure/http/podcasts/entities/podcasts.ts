export interface FetchPodcastsResponse {
  feed: Feed;
}

interface Feed {
  author: Author;
  entry: Entry[];
}

interface Author {
  name: Item;
  uri: Item;
}

interface Entry {
  id: Item;
  title: Item;
  "im:image": Item[];
  "im:artist": Item;
  summary: Item;
  link: Item;
}

interface Item {
  label?: string;
  attributes?: Attributes;
}

interface Attributes {
  "m:id": string;
  rel?: string;
  type?: string;
  href?: string;
}
