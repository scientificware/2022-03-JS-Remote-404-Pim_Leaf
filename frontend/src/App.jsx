/* eslint-disable import/no-unresolved */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import ProtectedRoute from "@components/layout/ProtectRoute";
import DashboardLayout from "@components/layout/DashBoardLayout";
import Login from "@pages/Login";
import Company from "@pages/Company";
import CompanyDetails from "@pages/CompanyDetails";
import Profil from "@pages/Profil";

import Products from "@retailers/Products";
import Suppliers from "@retailers/Suppliers";
import SuppliersDetails from "@retailers/SuppliersDetails";
import ProductsDetails from "@retailers/ProductsDetails";

import SuppliersProducts from "@suppliers/SupProducts";
import SuppliersProductsDetails from "@suppliers/SupProductsDetails";
import SuppliersClients from "@suppliers/SuppliersClients";
import SuppliersClientsDetails from "@suppliers/SuppliersClientsDetails";

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
            {/* RETAILERS */}
            <Route path="retailer/products" element={<Products />} />
            <Route path="retailer/products/:id" element={<ProductsDetails />} />
            <Route path="retailer/suppliers" element={<Suppliers />} />
            <Route
              path="retailer/suppliers/:id"
              element={<SuppliersDetails />}
            />

            {/* SUPPLIERS */}
            <Route path="supplier/products" element={<SuppliersProducts />} />
            <Route
              path="supplier/products/:id"
              element={<SuppliersProductsDetails />}
            />
            <Route path="supplier/client" element={<SuppliersClients />} />
            <Route
              path="supplier/client/:id"
              element={<SuppliersClientsDetails />}
            />

            {/* COMMON */}
            <Route path="company" element={<Company />} />
            <Route path="company/:id" element={<CompanyDetails />} />
            <Route path="profil" element={<Profil />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
