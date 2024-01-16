import { Route, Routes } from "react-router-dom";

import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
