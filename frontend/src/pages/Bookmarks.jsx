import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks } from "../features/bookmarks/BookmarkSlice";
import Feed from "../components/feed/feed";
import { getUserUUID } from "../utils/user";

// BookmarksPage component to display the user's bookmarked articles.
function BookmarksPage() {
  const dispatch = useDispatch();

  // Accessing bookmarked items from the redux store.
  const {
    items: bookmarked,
  } = useSelector((state) => state.bookmarks);
  const user_uuid = getUserUUID();
 
  // Fetch bookmarks when component mounts
  useEffect(() => {
    if (user_uuid) {
      dispatch(fetchBookmarks());
    }
  }, [dispatch]);

  // Rendering the Feed component with isBookmarkPage prop set to true.
  return (
  <div>
     {bookmarked.length === 0 ? (
        "No bookmarks yet!"
      ) : (
        <Feed isBookmarkPage ={true} />
      )}
  </div>
  );
}

export default BookmarksPage;
