export interface MediumUser {
  id: string;
  username: string;
  name: string;
  url: string;
  imageUrl: string;
}

export interface MediumArticle {
  id: string;
  name: string;
  description: string;
  url: string;
  imageUrl: string;
}

export interface MediumPublishedArticle {
  id: string;
  title: string;
  authorId: string;
  url: string;
  canonicalUrl: string;
  publishStatus: string;
  publishedAt: string;
  license: string;
  licenseUrl: string;
  tags: string[];
}
