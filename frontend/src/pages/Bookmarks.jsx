import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks } from "../features/bookmarks/BookmarkSlice";
import Feed from "../components/feed/feed";
import { getUserUUID } from "../utils/user";
import LottieState from "../components/Loader/LottieState";

function BookmarksPage() {
  const dispatch = useDispatch();
  const { items: bookmarked } = useSelector((state) => state.bookmarks);
  const user_uuid = getUserUUID();

  useEffect(() => {
    if (user_uuid) dispatch(fetchBookmarks());
  }, [dispatch]);

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <div>
          <h2 style={styles.pageTitle}>Bookmarks</h2>
          <p style={styles.pageSubtitle}>
            {bookmarked.length > 0 ? `${bookmarked.length} saved article${bookmarked.length > 1 ? "s" : ""}` : "Your reading list"}
          </p>
        </div>
      </div>
      {bookmarked.length === 0
        ? <LottieState type="empty" message="No bookmarks yet — save articles to read later" />
        : <Feed isBookmarkPage={true} />}
    </div>
  );
}

const styles = {
  page: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "28px 24px",
  },
  pageHeader: {
    marginBottom: "24px",
    paddingBottom: "20px",
    borderBottom: "1px solid var(--border)",
  },
  pageTitle: {
    fontSize: "24px",
    fontWeight: 700,
    color: "var(--text-primary)",
    letterSpacing: "-0.5px",
    marginBottom: "4px",
  },
  pageSubtitle: {
    fontSize: "13px",
    color: "var(--text-muted)",
  },
};

export default BookmarksPage;
