import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";

export default function Loader() {
  const [isFirstLoad] = useState(() => !sessionStorage.getItem("app_loaded"));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    sessionStorage.setItem("app_loaded", "1");
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "70vh", background: "#0a0a0f", gap: "4px" }}>
      <DotLottieReact
        src="https://lottie.host/ba73a2c3-66ab-4b2b-a8a0-c56efcd916a8/nTUSNugreA.lottie"
        loop autoplay style={{ width: 420, height: 420, filter: "invert(1) hue-rotate(200deg)" }}
      />
      {isFirstLoad ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <p style={{ color: "#ffffff", fontSize: "20px", fontWeight: 700, letterSpacing: "0.3px" }}>
            Loading articles, please wait...
          </p>
          <p style={{ color: "#8888aa", fontSize: "15px", fontWeight: 400, textAlign: "center", maxWidth: "420px", lineHeight: 1.6 }}>
            The backend is hosted on Render — it may take a few minutes to wake up on first load.
          </p>
        </div>
      ) : (
        <p style={{ color: "#ffffff", fontSize: "20px", fontWeight: 700, letterSpacing: "0.3px" }}>
          Loading articles, please wait...
        </p>
      )}
    </div>
  );
}
