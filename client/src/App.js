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
import MainPageProtected from "./Main/MainPageProtected";
import ErrorPage from "./Main/ErrorPage.jsx";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LandingPage />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route
            path="/main/:roomId"
            element={
              <MainPageProtected>
                <MainPage />
              </MainPageProtected>
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route path="/main" element={<MainPage />} /> */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
