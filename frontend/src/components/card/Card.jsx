import Button from "../button/button.jsx";
import { useDispatch } from "react-redux";
import { openArticlePanel } from "../articles/articleReaderSlice.jsx";
import nullImage from "../../assets/nullImage.jpg";

function Card({article, isBookmarkPage}) {
  const dispatch = useDispatch();
  
  //function to open the article panel when the card is clicked.
  function handleCardClick()  {
    //dispatching the action to open the article panel with the selected article.
    dispatch(openArticlePanel(article));
  };

    //rendering the card component with article details and bookmark button.  
    return (  
      <div style={styles.card} onClick={handleCardClick}>
        <div style={styles.imageWrapper}>
          <img 
            src={article.article_image || nullImage} 
            alt={article.article_title} 
            style={styles.image} 
          />

        {/* Buttons container */}
        <div style={styles.buttonContainer}>

          {/* isBookmarkPage prop is passed to determine if the card is being rendered on the bookmark page. */}
          <Button buttonType="bookmark" article={article} isBookmarkPage={isBookmarkPage}/>
        </div>
      </div>

      <div style={styles.content} >
        <span style={styles.section}>{article.sectionname}</span>
        <h3 style={styles.title}>{article.article_title}</h3>
        <p style={styles.description}>{article.description.slice(0,100)}</p>
    </div>
  </div>
)}


const styles = {
  card: {
    backgroundColor: "#232323ff",
    width: "100%",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    border: "1px solid #333",
  },

  image: {
    width: "100%",
    height: "200px",
    display: "block",
  },
  
  imageWrapper: {
    position: "relative", 
    width: "100%",
    height: "200px",      
  },

  buttonContainer: {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 10,
    display: "flex",
    gap: "8px",
  },
  
  content: {
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    margin: "0 0 4px 0",
  },

  section: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#3ea6ff",
    textTransform: "uppercase",
    marginBottom: "5px",
    },

  title: {
    fontSize: "17px",
    fontWeight: "700",
    lineHeight: "1.3",
    margin: 0,
    color: "#ffffff",
  },

  description: {
    fontSize: "14px",
    lineHeight: "1.4",
    color: "#cfcfcf",
    margin: 0,
  },
};
export default Card;