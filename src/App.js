import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import RouterOutlet from "./router-outlet";
import ThemeContext from "./context/themeContext";
import "./App.scss";

function App() {
  const themeHook = useState("dark");
  return (
      <BrowserRouter>
        <RouterOutlet />
      </BrowserRouter>
  );
}

export default App;
