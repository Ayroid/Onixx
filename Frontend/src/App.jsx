import { Route, Routes } from "react-router-dom";

import "./App.css";

import ProtectedRoute from "./utils/ProtectedRoute";

import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";
import Homepage from "./pages/Homepage/Homepage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

function App() {
  return (
    <Routes>
      <Route
        path="/signup"
        element={
          <ProtectedRoute path="/signup">
            <Signup />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signin"
        element={
          <ProtectedRoute path="/signin">
            <Signin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute path="/">
            <Homepage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
