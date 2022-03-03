/* eslint-disable react/no-danger */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
import { useParams, Navigate } from 'react-router-dom';
import './styles.scss';

type MyProps = {
  posts: {
    id: number;
    title: string;
    content: string;
    category: string;
    slug: string;
  }[];
};
const Single = ({ posts }: MyProps) => {
  const { slug } = useParams();
  const post = posts.find((el) => el.slug === slug);

  if (!_.isNil(post)) {
    return (
      <article className="single" key={post.id}>
        <h2 className="single-title">{post.title}</h2>
        <div className="single-category">{post.category}</div>
        <p className="single-content"> {post.content}</p>
      </article>
    );
  }
  return <Navigate to="/not-found" replace />;
};
Single.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
export default Single;
