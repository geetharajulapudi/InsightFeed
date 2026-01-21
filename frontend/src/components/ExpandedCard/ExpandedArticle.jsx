import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeArticlePanel } from "../articles/articleReaderSlice.jsx";
import nullImage from "../../assets/nullImage.jpg";

/*
  Splits long text into readable paragraphs.
  Each paragraph has at least `minWords` words
  and ends at a sentence boundary.
 */
const splitIntoParagraphs = (text, minWords = 300) => {
  if (!text) return [];

  const words = text.trim().split(/\s+/);
  const paragraphs = [];

  for (let i = 0; i < words.length; i += minWords) {
    let end = Math.min(i + minWords, words.length);

    // Move forward until sentence end
    while (end < words.length && !/[.!?]$/.test(words[end - 1])) {
      end++;
    }

    paragraphs.push(words.slice(i, end).join(" "));
    i = end - minWords;
  }

  return paragraphs;
};

function ExpandedArticle() {
  const dispatch = useDispatch();
  const { showPanel, articles } = useSelector(
    (state) => state.articlePanel
  );

  /* Close panel on ESC key press
   */
  useEffect(() => {
    if (!showPanel) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        dispatch(closeArticlePanel());
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showPanel, dispatch]);

  // Do not render anything if panel is closed
  if (!showPanel || !articles) return null;

  const {
    article_title,
    article_image,
    trailtext,
    description,
  } = articles;

  return (
    <div style={styles.overlay}>
      <div style={styles.panel}>
        {/* Header */}
        <header style={styles.header}>
          <h2 style={styles.title}>{article_title}</h2>
          <button
            style={styles.closeButton}
            onClick={() => dispatch(closeArticlePanel())}
          >
            ×
          </button>
        </header>

        {/* Image */}
        <img
          src={article_image || nullImage}
          alt={article_title}
          style={styles.image}
        />

        {/*Trail Text*/}
        <div style={styles.trailtext}>{trailtext}</div>

        {/*Scrollable Content */}
        <div style={styles.descriptionWrapper}>
          {splitIntoParagraphs(description).map((para, idx) => (
            <p key={idx} style={styles.paragraph}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  panel: {
    backgroundColor: "#232323",
    borderRadius: "12px",
    width: "1300px",
    maxWidth: "90vw",
    height: "85vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  header: {
    padding: "12px 20px",
    borderBottom: "1px solid #3a3a3a",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 0,
  },

  title: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1.25,
  },

  closeButton: {
    background: "none",
    border: "none",
    color: "#aaa",
    fontSize: "22px",
    cursor: "pointer",
  },

  image: {
    width: "100%",
    height: "320px",        // ⬅ reduced height
    objectFit: "cover",
    flexShrink: 0,
    padding: "0 20px",
  },

  trailtext: {
    padding: "12px 20px 8px",   // ⬅ reduced gap
    fontSize: "16px",
    fontWeight: 700,            // ⬅ bold
    color: "#e0e0e0",
    lineHeight: 1.45,
    flexShrink: 0,
  },

  descriptionWrapper: {
    flex: 1,                    // ✅ THIS enables scroll
    overflowY: "auto",
    padding: "0 20px 20px",
    color: "#ddd",
    fontSize: "15px",
    lineHeight: 1.8,
  },

  paragraph: {
    marginBottom: "14px",
  },

  link: {
    color: "#3ea6ff",
    textDecoration: "none",
    fontWeight: 500,
  },
};

export default ExpandedArticle;