import React, { useState, useEffect } from "react";
import "./App.css";
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 1450;
  console.log(windowWidth);
  return (
    <div className="App">
      {isMobile ? (
        <div className="mobileContent">
          <h1>Not Suitable To View in Mobile Mode</h1>
        </div>
      ) : (
        <PathfindingVisualizer />
      )}
    </div>
  );
}

export default App;
