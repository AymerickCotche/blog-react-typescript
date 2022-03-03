type Posts = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  slug: string;
}[];

export const getPostsByCategory = (categoryToDisplay: string, posts: Posts) =>
  posts.filter(({ category }) => category === categoryToDisplay);
