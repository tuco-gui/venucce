import React from "react";
import { createRoot } from "react-dom/client";

// Reaproveita o seu viewer 3D do projeto
import MacContainer from "./components/MacContainer.jsx";

// Mantém exatamente o mesmo visual do projeto
import "./assets/css/index.css";
import "./assets/css/style.css";

function Embed() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      {/* Se o MacContainer aceitar alguma prop para esconder UI, pode passar aqui, ex.: <MacContainer embed /> */}
      <MacContainer />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Embed />);
