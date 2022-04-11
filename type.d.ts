/** @format */

export interface Image {
  asset: { url: string };
}

export interface Post {
  _id: string;
  publishedAt: string;
  title: string;
  description: string;
  author: Author;
  comments: Comment[];
  mainImage: Image;
  slug: {
    current: string;
  };
  body: [object];
}

export interface Author {
  _id: string;
  name: string;
  image: Image;
  slug: {
    current: string;
  };
  bio: [object];
}

export interface Comment {
  _id: string;
  post: {
    _ref: string;
    _type: string;
  };
  name: string;
  email: string;
  comment: string;
  approved: boolean;
  _createdAt: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
