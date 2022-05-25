/* eslint-disable import/no-unresolved */
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "@pages/Login";
import Products from "@pages/Products";
import Suppliers from "@pages/Suppliers";
import Clients from "@pages/Clients";
import Company from "@pages/Company";
import Profil from "@pages/Profil";

import "./App.css";
import "./index.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="./pages/login" element={<Login />} />
          <Route path="./pages/products" element={<Products />} />
          <Route path="./pages/suppliers" element={<Suppliers />} />
          <Route path="./pages/clients" element={<Clients />} />
          <Route path="./pages/company" element={<Company />} />
          <Route path="./pages/profil" element={<Profil />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
