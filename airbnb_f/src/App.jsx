import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Listing from "./pages/Listing"; // Match import with component name

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Ensure this is included

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<Listing />} />
      </Routes>
    </Router>
  );
}

export default App;
