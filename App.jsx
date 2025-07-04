//==============================|| Library Imports ||================================
import {RecoilRoot} from "recoil";
import useErrorBoundary from "use-error-boundary"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//==============================|| Project Imports ||================================
import ErrorBoundaryPage from "./pages/ErrorBoundaryPage";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import AlumniListing from "./pages/AlumniListing";
import Jobs from "./pages/Jobs";
import NewsHub from "./pages/NewsHub";
import Profile from "./pages/Profile";
import Page404 from "./pages/Page404";
import PersistLogin from "./utils/PersistLogin";
import ViewProfilePage from './pages/ViewProfilePage';
import AdminPanel from "./pages/AdminPanel";
import Polls from "./pages/Polls";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import CustomCursor from "./components/CustomCursor";
// import LoginSignup from "./pages/LoginSignup";

const App =() => {
  const {ErrorBoundary,didCatch, error, reset} = useErrorBoundary();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#FA005E'
      },
      secondary: {
        main: '#000000'
      }
    }
  });

  return (
<>
  <CustomCursor/>
  
  {/* Floating pink background elements */}
  <div className="floating-pink"></div>
  <div className="floating-pink"></div>
  <div className="floating-pink"></div>
  <div className="floating-pink"></div>
  
  {didCatch ? (
      <ErrorBoundaryPage error={error} reset={reset} />
  ) : (
  <ErrorBoundary>
  <RecoilRoot>
    <ThemeProvider theme={theme}>
    <PersistLogin />
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/about" element={<AboutUs/>} />
        <Route exact path="/alumni" element={<AlumniListing/>} />
        <Route exact path="/news" element={<NewsHub/>} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path="/view" element={<ViewProfilePage/>} />
        <Route exact path="/jobs" element={<Jobs/>} />
        <Route exact path="/polls" element={<Polls/>} />
        {/*<Route exact path="/login" element={<Login/>} />*/}
        {/* <Route exact path="/login" element={<LoginSignup/>} /> */}
        <Route exact path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<Page404/>} />
      </Routes>
    </Router>
    </ThemeProvider>
  </RecoilRoot>
  </ErrorBoundary>
      )}
</>
  );
}

export default App;

