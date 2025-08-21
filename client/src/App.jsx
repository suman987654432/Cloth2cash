import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"
import LandingPage from "./pages/LandingPage";
import WhatsApp from "./components/ui/WhatsApp";
import SchedulePage from "./pages/SchedulePage";
import AboutPage from "./pages/AboutPage";

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/about" element={<AboutPage />} />
        </Route>
    </Routes>
    </BrowserRouter>
    <WhatsApp />
    </>
  )
}

export default App