import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import BasketPage from "./pages/BasketPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sepet" element={<BasketPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
