import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "70vh", background: "#0a0a0f", gap: "4px" }}>
      <DotLottieReact
        src="https://lottie.host/ba73a2c3-66ab-4b2b-a8a0-c56efcd916a8/nTUSNugreA.lottie"
        loop autoplay style={{ width: 340, height: 340, filter: "invert(1) hue-rotate(200deg)" }}
      />
      <p style={{ color: "#ffffff", fontSize: "15px", fontWeight: 500, letterSpacing: "0.3px" }}>Loading articles, please wait...</p>
    </div>
  );
}
