import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"
import LandingPage from "./pages/LandingPage";
import WhatsApp from "./components/ui/WhatsApp";
import SchedulePage from "./pages/SchedulePage";
import AboutPage from "./pages/AboutPage";
import HowWorks from "./pages/HowWorks";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <>
    <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowWorks />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        </Route>
    </Routes>
    </BrowserRouter>
    <WhatsApp />
    </>
  )
}

export default App