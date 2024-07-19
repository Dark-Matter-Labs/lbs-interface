import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@watergis/mapbox-gl-export/dist/mapbox-gl-export.css";

import Home from "./pages/Home";
import Methode from "./pages/Methode";
import Wirkung from "./pages/Wirkung";
import Wiki from "./pages/Wiki";
import Info from "./pages/Info";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/methode" element={<Methode />} />
        <Route exact path="/wirkungsmodellierung" element={<Wirkung />} />
        <Route exact path="/wiki" element={<Wiki />} />
        <Route exact path="/info" element={<Info />} />
        <Route exact path="/kontact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
