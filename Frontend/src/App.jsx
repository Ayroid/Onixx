import { Route, Routes } from "react-router-dom";

import "./App.css";

import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";
import Homepage from "./pages/Homepage/Homepage";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
