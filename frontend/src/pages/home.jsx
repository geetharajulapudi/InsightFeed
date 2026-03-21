import { useEffect } from "react";
import Feed from "../components/feed/feed";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../components/articles/articleSlice";
import Loader from "../components/Loader/Loader";
import LottieState from "../components/Loader/LottieState";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.articles);

  useEffect(() => { dispatch(fetchArticles()); }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <LottieState type="error" message="Failed to load articles" />;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Top Stories</h1>
      </div>
      <Feed isBookmarkPage={false} />
    </div>
  );
};

const styles = {
  page: {
    maxWidth: "1600px",
    margin: "0 auto",
    padding: "16px 32px 48px",
    animation: "fadeIn 0.4s ease",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "22px",
    fontWeight: 800,
    color: "#e8e8f0",
    letterSpacing: "-0.5px",
  },
};

export default Home;
