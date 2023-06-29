import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./register/SignUp";
import SignIn from "./register/SignIn";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<SignUp></SignUp>} />
        <Route path="/login" element={<SignIn></SignIn>} />
      </Routes>
    </div>
  );
}

export default App;
