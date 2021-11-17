import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CarPage from "./pages/CarPage";

const App = () => {
  const [carId, setCarId] = useState('');


  return (
    <Router>
      <Header carId={carId} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage  />} />
          <Route path="/car/:id" element={<CarPage setCarId={setCarId} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
