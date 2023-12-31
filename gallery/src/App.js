import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./register/SignUp";
import SignIn from "./register/SignIn";
import AuthRedirect from "./components/AuthRedirect";
import ProtectedRoute from "./components/ProtectedRoute";
import AllGalleries from "./pages/AllGalleries";
import CreateGallery from "./components/CreateGallery";
import { useEffect } from "react";
import MyGalleries from "./pages/MyGalleries";
import EditGallery from "./components/EditGallery";
import ViewGallery from "./pages/ViewGallery";
import AuthorsPage from "./pages/AuthorsPage";
function App() {
  // useEffect(() => {}, []);
  return (
    <div>
      <Routes>
        <Route
          path="/register"
          element={
            <AuthRedirect>
              <SignUp />
            </AuthRedirect>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <SignIn />
            </AuthRedirect>
          }
        />
        <Route path="/" element={<AllGalleries />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateGallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-galleries"
          element={
            <ProtectedRoute>
              <MyGalleries />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-gallery/:id"
          element={
            <ProtectedRoute>
              <EditGallery />
            </ProtectedRoute>
          }
        />
        <Route path="/galleries/:id" element={<ViewGallery />} />
        <Route path="/authors/:id" element={<AuthorsPage />} />
      </Routes>
    </div>
  );
}

export default App;
