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
import { createTheme, ThemeProvider } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0e7b52",
        contrastText: "#ffff",
        multilineColor: "#ffff",
      },
      secondary: {
        main: "#4caf50",
      },
    },
  });

  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route element={<ProtectedRoutes />}>
              <Route
                path="main/:roomId"
                element={<MainPage noRoom={false} />}
              />
              <Route path="/main" element={<MainPage noRoom={true} />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
