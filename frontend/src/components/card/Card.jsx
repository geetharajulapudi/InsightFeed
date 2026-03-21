import { useState } from "react";
import Button from "../button/button.jsx";
import { useDispatch } from "react-redux";
import { openArticlePanel } from "../articles/articleReaderSlice.jsx";
import nullImage from "../../assets/nullImage.jpg";

function Card({ article, isBookmarkPage, size = "small" }) {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);
  const isHero = size === "hero";

  return (
    <div
      style={{ ...styles.card, ...(hovered ? styles.cardHovered : {}) }}
      onClick={() => dispatch(openArticlePanel(article))}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={article.article_image || nullImage}
        alt={article.article_title}
        style={{
          ...styles.image,
          transform: hovered ? "scale(1.06)" : "scale(1)",
        }}
      />

      {/* Gradient — stronger for hero */}
      <div style={{
        ...styles.overlay,
        background: isHero
          ? "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 100%)"
          : "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.05) 100%)",
      }} />

      <div style={styles.bookmarkBtn} onClick={(e) => e.stopPropagation()}>
        <Button buttonType="bookmark" article={article} isBookmarkPage={isBookmarkPage} />
      </div>

      <div style={styles.bottom}>
        {article.sectionname && (
          <span style={styles.category}>{article.sectionname}</span>
        )}
        <h3 style={{
          ...styles.title,
          fontSize: isHero ? "22px" : "13px",
          WebkitLineClamp: isHero ? 3 : 2,
        }}>
          {article.article_title}
        </h3>
        {article.description && (
          <p style={styles.desc}>{article.description.slice(0, isHero ? 120 : 80)}…</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: "6px",
    overflow: "hidden",
    cursor: "pointer",
    backgroundColor: "#0d0d14",
    transition: "transform 0.22s ease, box-shadow 0.22s ease",
  },
  cardHovered: {
    transform: "translateY(-3px)",
    boxShadow: "0 16px 48px rgba(0,0,0,0.65)",
  },
  image: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.45s ease",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  bookmarkBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 10,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "14px 12px 12px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  category: {
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#a78bfa",
  },
  title: {
    fontWeight: 700,
    lineHeight: 1.3,
    color: "#fff",
    margin: 0,
    letterSpacing: "-0.2px",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  desc: {
    fontSize: "12px",
    lineHeight: 1.5,
    color: "rgba(255,255,255,0.6)",
    margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
};

export default Card;
