/* eslint-disable import/no-unresolved */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import Login from "@pages/Login";
import Products from "@retailers/Products";
import Suppliers from "@retailers/Suppliers";
import Company from "@pages/Company";
import Profil from "@pages/Profil";
import SuppliersDetails from "@retailers/SuppliersDetails";
import CompanyDetails from "@pages/CompanyDetails";
import ProductsDetails from "@retailers/ProductsDetails";
import SuppliersProducts from "@suppliers/SupProducts";
import SuppliersProductsDetails from "@suppliers/SupProductsDetails";
import DashboardLayout from "@components/layout/DashBoardLayout";
import ProtectedRoute from "@components/layout/ProtectRoute";

import UserExport from "@contexts/UserContext";

import "./App.css";

function App() {
  const { user } = useContext(UserExport.UserContext);

  return (
    <BrowserRouter>
      <div className="h-screen bg-center bg-cover">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductsDetails />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="suppliers/:id" element={<SuppliersDetails />} />
            <Route path="company" element={<Company />} />
            <Route path="company/:id" element={<CompanyDetails />} />
            <Route path="profil" element={<Profil />} />
            <Route path="products/supplier" element={<SuppliersProducts />} />
            <Route
              path="products/supplier/:id"
              element={<SuppliersProductsDetails />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
