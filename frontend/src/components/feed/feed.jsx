import { useState } from "react";
import Card from "../card/Card.jsx";
import { useSelector } from "react-redux";
import "./feed.css";

const PAGE_SIZE = 16;

function Feed({ isBookmarkPage = false }) {
  const [page, setPage] = useState(1);

  const articles = useSelector((state) =>
    isBookmarkPage ? state.bookmarks.items : state.articles.items
  );

  if (!articles || articles.length === 0) {
    return (
      <div style={styles.empty}>
        <div style={styles.emptyIcon}>{isBookmarkPage ? "🔖" : "📰"}</div>
        <p style={styles.emptyTitle}>{isBookmarkPage ? "No bookmarks yet" : "No articles found"}</p>
        <p style={styles.emptySubtitle}>{isBookmarkPage ? "Save articles to read them later" : "Try a different search term"}</p>
      </div>
    );
  }

  const totalPages = Math.ceil(articles.length / PAGE_SIZE);
  const paged = articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePage = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /*
    Block 1 — 2 articles:  [  A(hero 2col)  ] [ B ]
    Block 2 — 3 articles:  [ A ] [  B(wide 2col)  ] [ C ]
    Block 3 — 3 articles:  [  A(wide 2col)  ] [ B ] [ C ]
    Total per cycle = 8 articles
  */
  const blocks = [];
  let i = 0;
  let blockType = 1;
  while (i < paged.length) {
    if (blockType === 1) {
      blocks.push({ type: 1, articles: paged.slice(i, i + 2) });
      i += 2;
    } else if (blockType === 2) {
      blocks.push({ type: 2, articles: paged.slice(i, i + 3) });
      i += 3;
    } else {
      blocks.push({ type: 3, articles: paged.slice(i, i + 3) });
      i += 3;
    }
    blockType = blockType === 3 ? 1 : blockType + 1;
  }

  return (
    <div>
      <div style={styles.wrapper}>
        {blocks.map((block, bi) => {
          if (block.type === 1) return <Block1 key={bi} articles={block.articles} isBookmarkPage={isBookmarkPage} />;
          if (block.type === 2) return <Block2 key={bi} articles={block.articles} isBookmarkPage={isBookmarkPage} />;
          return <Block3 key={bi} articles={block.articles} isBookmarkPage={isBookmarkPage} />;
        })}
      </div>

      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            style={{ ...styles.pageBtn, ...(page === 1 ? styles.pageBtnDisabled : {}) }}
            onClick={() => handlePage(page - 1)}
            disabled={page === 1}
          >← Prev</button>
          <div style={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                style={{ ...styles.pageNum, ...(p === page ? styles.pageNumActive : {}) }}
                onClick={() => handlePage(p)}
              >{p}</button>
            ))}
          </div>
          <button
            style={{ ...styles.pageBtn, ...(page === totalPages ? styles.pageBtnDisabled : {}) }}
            onClick={() => handlePage(page + 1)}
            disabled={page === totalPages}
          >Next →</button>
        </div>
      )}
    </div>
  );
}

// Block 1: [ A(hero — 2col) ] [ B ]
// grid: 3 cols → A spans 2, B spans 1
function Block1({ articles, isBookmarkPage }) {
  const [a, b] = articles;
  return (
    <div className="feed-grid3" style={{ ...styles.grid3col, gridTemplateAreas: '"a a b"', height: "300px" }}>
      {a && <div style={{ gridArea: "a" }}><Card article={a} isBookmarkPage={isBookmarkPage} size="hero" /></div>}
      {b && <div style={{ gridArea: "b" }}><Card article={b} isBookmarkPage={isBookmarkPage} size="small" /></div>}
    </div>
  );
}

// Block 2: [ A ] [ B(wide — 2col) ] [ C ]
// grid: 4 cols → A spans 1, B spans 2, C spans 1
function Block2({ articles, isBookmarkPage }) {
  const [a, b, c] = articles;
  return (
    <div className="feed-grid4" style={{ ...styles.grid4col, gridTemplateAreas: '"a b b c"', height: "300px" }}>
      {a && <div style={{ gridArea: "a" }}><Card article={a} isBookmarkPage={isBookmarkPage} size="small" /></div>}
      {b && <div style={{ gridArea: "b" }}><Card article={b} isBookmarkPage={isBookmarkPage} size="hero" /></div>}
      {c && <div style={{ gridArea: "c" }}><Card article={c} isBookmarkPage={isBookmarkPage} size="small" /></div>}
    </div>
  );
}

// Block 3: [ A(wide — 2col) ] [ B ] [ C ]
// grid: 4 cols → A spans 2, B spans 1, C spans 1
function Block3({ articles, isBookmarkPage }) {
  const [a, b, c] = articles;
  return (
    <div className="feed-grid4" style={{ ...styles.grid4col, gridTemplateAreas: '"a a b c"', height: "300px" }}>
      {a && <div style={{ gridArea: "a" }}><Card article={a} isBookmarkPage={isBookmarkPage} size="hero" /></div>}
      {b && <div style={{ gridArea: "b" }}><Card article={b} isBookmarkPage={isBookmarkPage} size="small" /></div>}
      {c && <div style={{ gridArea: "c" }}><Card article={c} isBookmarkPage={isBookmarkPage} size="small" /></div>}
    </div>
  );
}

const GAP = 38; // gap between articles inside a block
const BLOCK_GAP = 48; // gap between blocks

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: `${BLOCK_GAP}px`,
    animation: "fadeIn 0.35s ease",
  },
  grid3col: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: `${GAP}px`,
  },
  grid4col: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: `${GAP}px`,
  },
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50vh",
    gap: "10px",
  },
  emptyIcon: { fontSize: "48px", marginBottom: "8px" },
  emptyTitle: { fontSize: "18px", fontWeight: 700, color: "#e8e8f0" },
  emptySubtitle: { fontSize: "14px", color: "#555570" },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginTop: "40px",
    paddingBottom: "20px",
  },
  pageBtn: {
    background: "#13131a",
    border: "1px solid #1e1e2e",
    color: "#e8e8f0",
    padding: "8px 18px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  pageBtnDisabled: { opacity: 0.3, cursor: "not-allowed" },
  pageNumbers: { display: "flex", gap: "6px" },
  pageNum: {
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    border: "1px solid #1e1e2e",
    background: "#13131a",
    color: "#888",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  pageNumActive: {
    background: "#4f46e5",
    border: "1px solid #4f46e5",
    color: "#fff",
  },
};

export default Feed;
