import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchArticles, clearSearch } from "../articles/articleSlice.jsx";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      query.trim() ? dispatch(fetchArticles(query.trim())) : (dispatch(clearSearch()), dispatch(fetchArticles()));
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (!e.target.value) { dispatch(clearSearch()); dispatch(fetchArticles()); }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header style={styles.navbar}>
      <div style={styles.inner} className="navbar-inner">

        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <div style={styles.logoMark}>
            <img src="/news.png" alt="logo" style={{ width: 26, height: 26, objectFit: "contain" }} />
          </div>
          <span style={styles.logoText}>InsightFeed</span>
        </Link>

        {/* Search */}
        <div className="search-wrap" style={{ ...styles.searchBox, ...(focused ? styles.searchBoxFocused : {}) }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bdbdde" strokeWidth="2.5" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            placeholder="Search articles..."
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleSearch}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={styles.searchInput}
          />
          {query && (
            <span
              style={styles.clearBtn}
              onClick={() => { setQuery(""); dispatch(clearSearch()); dispatch(fetchArticles()); }}
            >×</span>
          )}
        </div>

        {/* Nav links */}
        <nav style={styles.nav}>
          <Link to="/bookmarks" style={{ ...styles.navLink, ...(isActive("/bookmarks") ? styles.navLinkActive : {}) }}>
            Bookmarks
          </Link>
          <div style={styles.profileBtn}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
              alt="profile"
              style={{ width: 26, height: 26, borderRadius: "50%", filter: "brightness(0) invert(1) opacity(0.85)" }}
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

const styles = {
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(10,10,15,0.8)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    borderBottom: "1px solid #1a1a2e",
  },
  inner: {
    maxWidth: "1600px",
    margin: "0 auto",
    height: "58px",
    display: "flex",
    alignItems: "center",
    padding: "0 32px",
    gap: "20px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    flexShrink: 0,
    textDecoration: "none",
  },
  logoMark: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #312e81, #4c1d95)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(129,140,248,0.2)",
  },
  logoText: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#e8e8f0",
    letterSpacing: "-0.3px",
  },
  searchBox: {
    flex: 1,
    maxWidth: "440px",
    marginLeft: "60px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#1c1c28",
    border: "1px solid #3a3a55",
    borderRadius: "10px",
    padding: "0 14px",
    height: "40px",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  searchBoxFocused: {
    borderColor: "#6366f1",
    boxShadow: "0 0 0 3px rgba(99,102,241,0.2)",
  },
  searchInput: {
    flex: 1,
    background: "none",
    border: "none",
    outline: "none",
    color: "#ffffff",
    fontSize: "14px",
    fontFamily: "inherit",
  },
  clearBtn: {
    color: "#555570",
    cursor: "pointer",
    fontSize: "18px",
    lineHeight: 1,
    flexShrink: 0,
    userSelect: "none",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginLeft: "auto",
    flexShrink: 0,
  },
  profileBtn: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #312e81, #4c1d95)",
    border: "1px solid rgba(129,140,248,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    transition: "border-color 0.2s, background 0.2s",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: 600,
    color: "#aaaacc",
    padding: "6px 14px",
    borderRadius: "8px",
    transition: "color 0.15s, background 0.15s",
    textDecoration: "none",
  },
  navLinkActive: {
    color: "#ffffff",
    background: "#1a1a2e",
  },
};

export default Navbar;
