import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeArticlePanel } from "../articles/articleReaderSlice.jsx";
import nullImage from "../../assets/nullImage.jpg";

const splitIntoParagraphs = (text, minWords = 300) => {
  if (!text) return [];
  const words = text.trim().split(/\s+/);
  const paragraphs = [];
  for (let i = 0; i < words.length; i += minWords) {
    let end = Math.min(i + minWords, words.length);
    while (end < words.length && !/[.!?]$/.test(words[end - 1])) end++;
    paragraphs.push(words.slice(i, end).join(" "));
    i = end - minWords;
  }
  return paragraphs;
};

function ExpandedArticle() {
  const dispatch = useDispatch();
  const { showPanel, articles } = useSelector((state) => state.articlePanel);

  useEffect(() => {
    if (!showPanel) return;
    const onEsc = (e) => { if (e.key === "Escape") dispatch(closeArticlePanel()); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [showPanel, dispatch]);

  if (!showPanel || !articles) return null;

  const { article_title, article_image, trailtext, description, sectionname, weburl } = articles;

  return (
    <div style={styles.overlay} onClick={() => dispatch(closeArticlePanel())}>
      <div style={styles.panel} onClick={(e) => e.stopPropagation()}>

        {/* Hero */}
        <div style={styles.hero}>
          <img src={article_image || nullImage} alt={article_title} style={styles.heroImg} />
          <div style={styles.heroGradient} />
          <button style={styles.closeBtn} onClick={() => dispatch(closeArticlePanel())}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
          <div style={styles.heroMeta}>
            {sectionname && <span style={styles.pill}>{sectionname}</span>}
            <h1 style={styles.heroTitle}>{article_title}</h1>
          </div>
        </div>

        {/* Body */}
        <div style={styles.body}>
          {trailtext && <p style={styles.trailtext}>{trailtext}</p>}
          <div style={styles.divider} />
          <div style={styles.content}>
            {splitIntoParagraphs(description).map((para, i) => (
              <p key={i} style={styles.para}>{para}</p>
            ))}
          </div>
          {weburl && (
            <a href={weburl} target="_blank" rel="noopener noreferrer" style={styles.sourceLink}>
              Read full article on source ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
    animation: "fadeIn 0.2s ease",
  },
  panel: {
    background: "#0f0f18",
    border: "1px solid #1e1e2e",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "1100px",
    maxHeight: "88vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.1)",
  },
  hero: {
    position: "relative",
    height: "260px",
    flexShrink: 0,
    overflow: "hidden",
  },
  heroImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  heroGradient: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(5,5,15,0.97) 0%, rgba(5,5,15,0.4) 55%, transparent 100%)",
  },
  closeBtn: {
    position: "absolute",
    top: "14px",
    right: "14px",
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#e8e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  heroMeta: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "20px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  pill: {
    display: "inline-block",
    width: "fit-content",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    color: "#c4b5fd",
    background: "rgba(99,102,241,0.2)",
    border: "1px solid rgba(99,102,241,0.3)",
    padding: "3px 10px",
    borderRadius: "20px",
  },
  heroTitle: {
    fontSize: "20px",
    fontWeight: 800,
    lineHeight: 1.3,
    color: "#fff",
    letterSpacing: "-0.4px",
  },
  body: {
    flex: 1,
    overflowY: "auto",
    padding: "24px 28px 28px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  trailtext: {
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: 1.6,
    color: "#c8c8d8",
    letterSpacing: "-0.2px",
  },
  divider: {
    height: "1px",
    background: "#1e1e2e",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  para: {
    fontSize: "14px",
    lineHeight: 1.85,
    color: "#7070a0",
  },
  sourceLink: {
    display: "inline-block",
    fontSize: "13px",
    fontWeight: 600,
    color: "#818cf8",
    marginTop: "4px",
    textDecoration: "none",
  },
};

export default ExpandedArticle;
