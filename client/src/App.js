import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./Landing/LandingPage";
import MainPage from "./Main/MainPage";
import SignupPage from "./Landing/Components/Signup/SignupPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route exact path="/main/:roomId" element={<MainPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
