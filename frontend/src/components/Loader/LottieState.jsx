import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const SRCS = {
  error: "https://lottie.host/473fc344-c637-4301-99e2-ce07e998353a/SbxiSRueu5.lottie",
  empty: "https://lottie.host/e1aa500e-e17d-41de-bb73-7cb22e9ec2ef/uaEhaelP83.lottie",
  notfound: "https://lottie.host/737e8c8c-acbe-4ab4-9658-cabb3cb0f04c/BENmKSXFxF.lottie",
};

export default function LottieState({ type, message }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", gap: "8px" }}>
      <DotLottieReact src={SRCS[type]} loop autoplay style={{ width: 260, height: 260 }} />
      {message && <p style={{ color: "#555570", fontSize: "14px", fontWeight: 500 }}>{message}</p>}
    </div>
  );
}
