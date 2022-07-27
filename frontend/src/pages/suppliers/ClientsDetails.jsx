/* eslint-disable import/no-unresolved */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ProductsDetailsSupplier from "@components/retailers/ProductsDetailsSupplier";
import SuppliersDetailsDescription from "@components/retailers/SuppliersDetailsDescription";

function ClientsDetails() {
  const { id } = useParams();
  const [client, setClient] = useState();

  useEffect(() => {
    // Récupère le détail des informations du fournisseur
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}company/${id}`, {
        withCredentials: true,
      })
      .then((res) => setClient(res.data));
  }, []);

  if (!client) {
    return "wait a bit here please";
  }
  return (
    <main className="">
      <h1 className="text-3xl text-center font-bold font-barlow mt-14 mb-8">
        {client.company_name}
      </h1>

      <div className="flex flex-col font-redHat w-3/4 m-auto">
        <SuppliersDetailsDescription description={client.description} />

        <ProductsDetailsSupplier
          company={client.company_name}
          description={client.description}
          phone={client.phone}
          mail={client.company_mail}
          address={client.address}
          postcode={client.postcode}
          city={client.city}
          website={client.website}
        />
      </div>
    </main>
  );
}

export default ClientsDetails;
