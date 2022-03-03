/* eslint-disable react/no-danger */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import './styles.scss';

type MyProps = {
  post: {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    slug: string;
  };
};
const Post = ({ post }: MyProps) => {
  const createMarkup = () => ({
    __html: DOMPurify.sanitize(post.excerpt, {
      ALLOWED_TAGS: ['em', 'strong'],
    }),
  });
  return (
    <Link to={`/posts/${post.slug}`} className="post">
      <article key={post.id}>
        <h2 className="post-title">{post.title}</h2>
        <div className="post-category">{post.category}</div>
        <p className="post-excerpt" dangerouslySetInnerHTML={createMarkup()} />
      </article>
    </Link>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};
export default Post;
