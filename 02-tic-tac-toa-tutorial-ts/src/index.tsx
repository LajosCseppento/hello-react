import React from "react";
import ReactDOM from "react-dom/client";
import { Game } from "./components/Game";
import "./index.css";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(<Game wifeMode={true} />);
} else {
  const msg = "Initialisation failure!";
  console.error(msg);
  alert(msg);
}
