import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchArticles, clearSearch } from "../articles/articleSlice.jsx";

//Navbar component with search functionality integrated with Redux.
const Navbar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  //handles search when Enter key is pressed.
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (query.trim()) {
        dispatch(fetchArticles(query.trim()));
      } else {
        dispatch(clearSearch());
        dispatch(fetchArticles()); // Fetch default articles
      }
    }
  };

  //handles input change and clears search when input is empty.
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Clear search when input is empty
    if (value === "") {
      dispatch(clearSearch());
      dispatch(fetchArticles()); // Fetch default articles
    }
  };

  return (
    <header style={styles.navbar}>
      {/* LEFT */}
      <div style={styles.left}>
        <Link to="/" style={styles.logo}>InsightFeed</Link>
      </div>

      {/* CENTER */}
      <div style={styles.center}>
        <input
          placeholder="Search articles..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleSearch}
          style={styles.search}
        />
      </div>

      {/* links search with bookmarks */}
      <div style={styles.right}>
        <Link to="/bookmarks" style={styles.link}>Bookmarks</Link>
        <span style={styles.avatar}>👤</span>
      </div>
    </header>
  );
};

const styles = {
  navbar: {
    position: "relative",
    zIndex: 100,
    height: "80px",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    backgroundColor: "#1b1a1aff",
    borderBottom: "1px solid #262626",
    flexShrink: 0,
  },

  /* LEFT */
  left: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },

  logo: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#1a73e8",
    textDecoration: "none",
  },

  /* CENTER */
  center: {
    flex: 2,
    display: "flex",
    justifyContent: "center",
  },

  search: {
    width: "100%",
    maxWidth: "480px",
    padding: "8px 16px",
    borderRadius: "24px",
    backgroundColor: "#1e1e1e",
    border: "1px solid #333",
    color: "#fff",
    outline: "none",
    fontSize: "14px",
  },

  /* RIGHT */
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "16px",
  },

  link: {
    fontWeight: 600,
    fontSize: "14px",
    color: "#8ab4f8",
    textDecoration: "none",
  },

  avatar: {
    fontSize: "20px",
    cursor: "pointer",
  },
};

export default Navbar;
