// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import HomePage from "./pages/HomePages";
import DetailPage from "./pages/DetailPage";

function App() {
  const bannerImageUrl = "https://picsum.photos/1600/900";
  const bannerTitle = "Selamat Datang di Portal Ide";
  const bannerDescription = "Temukan berbagai ide menarik dan inovatif dari kami.";

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Banner imageUrl={bannerImageUrl} title={bannerTitle} description={bannerDescription} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;