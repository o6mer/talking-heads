import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./Landing/LandingPage";
import MainPage from "./Main/MainPage";
import SignupPage from "./Landing/Components/Signup/SignupPage";
import UserContextProvider from "./contexts/UserContextProvider";
import ForgotPassword from "./Landing/Components/ForgotPassword/ForgotPassword";
import ErrorPage from "./Main/ErrorPage.jsx";
import ProtectedRoutes from "./Main/ProtectedRoutes";
import LoginPage from "./Landing/Components/Login/LoginPage";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="main/:roomId" element={<MainPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
