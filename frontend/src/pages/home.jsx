import { useEffect, useState } from "react";
import Feed from "../components/feed/feed";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../components/articles/articleSlice";
import { fetchBookmarks } from "../features/bookmarks/BookmarkSlice";
import { getUserUUID } from "../utils/user";

// Home component to display the main feed of articles.
const Home = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.articles);

  // Fetch articles when component mounts
  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;
  
  // Rendering the Feed component with isBookmarkPage prop set to false.
  return <Feed isBookmarkPage={false}/>;
};

export default Home;


