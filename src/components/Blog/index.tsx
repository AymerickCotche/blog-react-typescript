/* eslint-disable brace-style */
import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Composants
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
import Spinner from 'src/components/Spinner';
import Single from 'src/components/Single';

// data, styles et utilitaires
import './styles.scss';

import { getPostsByCategory } from 'src/selectors/posts';

// == Composant
const Blog = () => {
  const [zenModeStatus, setZenModeStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hasError, setHasError] = useState(false);

  // eslint-disable-next-line arrow-body-style
  const jsxRoute = categories.map(({ route, label }) => {
    if (route === '/') {
      return (
        <Route path={route} key={route} element={<Posts posts={posts} />} />
      );
    }
    const displayedPost = getPostsByCategory(label, posts);
    return (
      <Route
        path={route}
        key={route}
        element={<Posts posts={displayedPost} />}
      />
    );
  });
  const handleLoadData = async () => {
    setHasError(false);
    try {
      const responsePosts = await axios.get(
        'https://oclock-open-apis.vercel.app/api/blog/posts',
      );
      const responseCategories = await axios.get(
        'https://oclock-open-apis.vercel.app/api/blog/categories',
      );
      setCategories(responseCategories.data);
      setPosts(responsePosts.data);
    } catch (error) {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <div className={`blog${zenModeStatus ? '--zen' : ''}`}>
      <Header
        categories={categories}
        zenModeStatus={zenModeStatus}
        onClickZenBtn={setZenModeStatus}
      />

      {loading && <Spinner />}
      {hasError && <div>Une erreur s'est produite</div>}
      {!loading && (
        <Routes>
          <Route path="/posts/:slug" element={<Single posts={posts} />} />
          {jsxRoute}
          <Route path="/jquery" element={<Navigate to="/autre" replace />} />
          {/* <Route path={foundPost.slug} element={<Single post={foundPost} />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}

      <Footer />
    </div>
  );
};

export default Blog;
