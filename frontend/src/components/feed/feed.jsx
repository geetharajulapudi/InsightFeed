import Card from "../card/Card.jsx";
import { useSelector } from "react-redux";

//Feed component to display a list of articles or bookmarks based on the isBookmarkPage prop.
function Feed({ isBookmarkPage = false})
{
  //selecting articles or bookmarks from the redux store.
  const articles = useSelector((state) => {
    if (isBookmarkPage) return state.bookmarks.items;
    return state.articles.items; // Both home and search results
  });

  //handling the case when there are no articles to display.
  if (!articles || articles.length === 0) {
    return <div>No articles found</div>;
  }

  return (
    <div style={styles.feed}>

      {/*mapping through the articles and rendering a Card component for each article. */}
     {articles.map((article) => (
      <Card key={article.article_id} article={article} isBookmarkPage={isBookmarkPage}/>
     ))}
    </div>
  )
}

const styles = {
  feed: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", 
    gap: "30px",
    margin: "0 auto",
    maxWidth: "1200px",
    padding: "10px",
    alignItems: "stretch",
    padding : "0, 16px"

  },
};

export default Feed;