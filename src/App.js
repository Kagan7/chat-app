import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import ForgetPassword from "./pages/forgetPassword";
import MainLayout from "./components/mainlayout";
import AuthLayout from "./components/authLayout";
import File404 from "./pages/file404";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="*" element={<File404 />} />
        </Route>
        
      </Routes>
    </Router>
  );
};

export default App;
