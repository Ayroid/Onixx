import { Route, Routes } from "react-router-dom";

import "./App.css";

import Signup from "./pages/Signup/Signup";
import Homepage from "./pages/Homepage/Homepage";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
