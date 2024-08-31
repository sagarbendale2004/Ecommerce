import React from "react";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShoppingCart from "./components/ShoppingCart";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/ShoppingCart" element={<ShoppingCart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
