export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  email: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  description: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Comment {
  id: string;
  content: string;
  author: Author;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  category: Category;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  readTime: number;
  views: number;
  likes: number;
  featured: boolean;
  published: boolean;
  comments: Comment[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'author' | 'subscriber';
  bio?: string;
  joinedAt: string;
}