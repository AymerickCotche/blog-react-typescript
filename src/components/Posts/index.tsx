import * as React from 'react';
import * as PropTypes from 'prop-types';
import Post from 'src/components/Post';

import './styles.scss';

type MyProps = {
  posts: {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    content: string;
    slug: string;
  }[];
};
const Posts = ({ posts }: MyProps) => (
  <main className="posts">
    <h1 className="posts-title">Dev Of Thrones</h1>
    <div className="posts-list">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  </main>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
export default Posts;
