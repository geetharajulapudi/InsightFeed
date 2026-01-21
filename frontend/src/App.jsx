import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Bookmarks from "./pages/Bookmarks.jsx";
import ExpandedArticle from "./components/ExpandedCard/ExpandedArticle.jsx";

function App() {

  // Main App component that sets up routing and layout for the application.
  return (
    <div style={styles.app}>
      <Navbar />
      <div style={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </div>

      {/* ExpandedArticle component to show the detailed view of an article. */}
      <ExpandedArticle />
    </div>
  );
}

const styles = {
  app: {
    height: "100vh",
    backgroundColor: "#000", 
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
  },
};
export default App;
