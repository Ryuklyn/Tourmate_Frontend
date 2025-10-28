import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TourMateLanding from "./pages/TourMateLanding";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TourMateLanding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
