/* eslint-disable import/no-unresolved */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import ProtectedRoute from "@components/layout/ProtectRoute";
import ProtectedRouteRetailer from "@components/layout/ProtectRouteRetailer";
import ProtectedRouteSupplier from "@components/layout/ProtectRouteSupplier";
import DashboardLayout from "@components/layout/DashBoardLayout";

// common
import Company from "@pages/common/Company";
import Login from "@pages/common/Login";
import Products from "@pages/common/Products";
import ProductsDetails from "@pages/common/ProductsDetails";
import Profil from "@pages/common/Profil";

// retailers
import Suppliers from "@retailersP/Suppliers";
import SuppliersDetails from "@retailersP/SuppliersDetails";

// suppliers
import Clients from "@suppliersP/Clients";
import ClientsDetails from "@suppliersP/ClientsDetails";

import UserExport from "@contexts/UserContext";

import "./App.css";

function App() {
  const { user } = useContext(UserExport.UserContext);

  return (
    <BrowserRouter>
      <div className="h-screen bg-center bg-cover">
        <Routes>
          {/* COMMON */}
          <Route path="/" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="entreprise" element={<Company />} />
            <Route path="profil" element={<Profil />} />
          </Route>

          {/* RETAILERS */}
          <Route
            path="/commercant"
            element={
              <ProtectedRouteRetailer user={user}>
                <DashboardLayout />
              </ProtectedRouteRetailer>
            }
          >
            <Route path="produits" element={<Products />} />
            <Route path="produit/:id/details" element={<ProductsDetails />} />
            <Route path="fournisseurs" element={<Suppliers />} />
            <Route
              path="fournisseur/:id/details"
              element={<SuppliersDetails />}
            />
          </Route>

          {/* SUPPLIERS */}
          <Route
            path="/fournisseur"
            element={
              <ProtectedRouteSupplier user={user}>
                <DashboardLayout />
              </ProtectedRouteSupplier>
            }
          >
            <Route path="produits" element={<Products />} />
            <Route path="produit/:id/details" element={<ProductsDetails />} />
            <Route path="clients" element={<Clients />} />
            <Route path="client/:id" element={<ClientsDetails />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
