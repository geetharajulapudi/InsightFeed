import BookmarkFull from "../../assets/bookmark-full.svg";
import BookmarkEmpty from "../../assets/bookmark-empty.svg";
import { saveBookmark, deleteBookmark } from "../../features/bookmarks/BookmarkSlice";
import { useDispatch, useSelector } from "react-redux";

//Button component to handle bookmarking articles.
function Button({ buttonType, article}) {
  const dispatch = useDispatch();

  //accessing the bookmarks from the redux store using useSelector.
  const bookmarks = useSelector((state) => state.bookmarks.items);

  //checking if the current article is already bookmarked.
  const isBookmarked = bookmarks.some(
    (b) => b.article_id === article.article_id   
  );

  //function to handle button click events.
  const ButtonClick = (e) => {
    e.stopPropagation();

    if (buttonType === "bookmark") {
      if (isBookmarked) {

        //finding the bookmark to delete based on article_id.
        const matched = bookmarks.find(
          (b) => b.article_id === article.article_id
        );

        //dispatching the deleteBookmark action to remove the bookmark.
        if (matched) {
          dispatch(deleteBookmark(matched.uuid));
        }
      } else {

        //if article is not bookmarked, dispatching saveBookmark action to add it in bookmarks.
        dispatch(saveBookmark(article));
      }
    } 
  };

  //determining which icon to display based on the button type and bookmark status.
  const icon =
    buttonType === "bookmark"
      ? isBookmarked
        ? BookmarkFull
        : BookmarkEmpty
     
      : null;

  //rendering the button with the appropriate icon and click handler.
  return (
    <div style={styles.icon} onClick={ButtonClick}>
      {icon && <img src={icon} alt="bookmark icon" style={styles.img} />}
    </div>
  );
}

const styles = {
  icon: {
    cursor: "pointer",
    padding: "2px",
    borderRadius: "4px",
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "23px",
    height: "23px",
  },
};

export default Button;
