/* eslint-disable import/no-unresolved */
import { useParams } from "react-router-dom";

import SearchBar from "@components/common/SearchBar";
import ProductsDetailsSupplier from "@components/retailers/ProductsDetailsSupplier";
import SuppliersDetailsDescription from "@components/retailers/SuppliersDetailsDescription";

import axios from "axios";
import { useState, useContext, useEffect } from "react";

import UserExport from "@contexts/UserContext";

function SuppliersDetails() {
  const { id } = useParams();
  const { user } = useContext(UserExport.UserContext);
  const [supplier, setSupplier] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/company/${id}`)
      .then((res) => setSupplier(res.data));
  }, []);

  console.warn(user);
  return (
    <main>
      <h1 className="flex justify-center text-3xl font-bold font-barlow">
        {supplier && supplier.company_name}
      </h1>

      <div className="flex flex-col font-redHat w-3/4 m-auto">
        <SuppliersDetailsDescription supplier={supplier} />

        <ProductsDetailsSupplier />
      </div>

      <SearchBar />
      {/* <ButtonFunction /> */}
      {/* <DetailsSuppliers products={dataProducts} /> */}
    </main>
  );
}

export default SuppliersDetails;
