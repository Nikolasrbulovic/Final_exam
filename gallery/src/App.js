import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./register/SignUp";
import SignIn from "./register/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import MyGalleries from "./components/MyGalleries";
import CreateGallery from "./components/CreateGallery";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/my-galleries"
          element={
            <ProtectedRoute>
              <MyGalleries />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateGallery />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
