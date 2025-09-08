import ReactDOM from "react-dom/client";
import "./i18n";
import App from "./App.jsx";
import "./index.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// Register service worker for PWA (vite-plugin-pwa auto registration)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch(() => {
        // no-op
      });
  });
}
