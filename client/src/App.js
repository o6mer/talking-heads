import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Landing/LandingPage";
import MainPage from "./Main/MainPage";
import SignupPage from "./Landing/Components/Signup/SignupPage";
import UserContextProvider from "./contexts/UserContextProvider";
import ForgotPassword from "./Landing/Components/ForgotPassword/ForgotPassword";
import MainPageProtected from "./Main/MainPageProtected";

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
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
