/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-unresolved */

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SearchBarHumans from "@components/common/SearchBarHumans";
import SuppliersLines from "@components/retailers/SuppliersLines";

import ButtonIcons from "@components/common/ButtonIcons";

import UserExport from "@contexts/UserContext";

function Suppliers() {
  const { user } = useContext(UserExport.UserContext);

  const [searchInput, setSearchInput] = useState("");

  const [connected, setConnected] = useState([]);
  const [pending, setPending] = useState([]);

  const icon = ["plus"];

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}retailer/${
          user.user_id
        }/suppliers/connected`
      )
      .then((res) => {
        setConnected(res.data);
      })
      .catch((error) => {
        console.warn(error.response.data);
      });

    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}retailer/${
          user.user_id
        }/suppliers/pending`
      )
      .then((res) => {
        setPending(res.data);
      })
      .catch((error) => {
        console.warn(error.response.data);
      });
  }, []);

  return (
    <main>
      <h1 className="text-3xl text-center font-bold font-barlow mt-14 mb-8">
        Mes Fournisseurs
      </h1>

      <SearchBarHumans
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      <div className="font-redHat w-4/5 m-auto">
        <div className="flex flex-row justify-end">
          {icon.map((i) => (
            <ButtonIcons icon={i} />
          ))}
        </div>

        <h2 className="text-2xl font-redHat mb-4">En attente de connexion</h2>
        <table className="w-full shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="text-left h-12 shadow-md">
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-middleBlue/100 bg-middleBlue/60 text-left text-xs font-semibold text-darkBlue uppercase tracking-wider w-3/12"
              >
                Nom
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-middleBlue/100 bg-middleBlue/60 text-left text-xs font-semibold text-darkBlue uppercase tracking-wider w-3/12"
              >
                Domaine
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-middleBlue/100 bg-middleBlue/60 text-left text-xs font-semibold text-darkBlue uppercase tracking-wider w-2/12"
              >
                Ville
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-middleBlue/100 bg-middleBlue/60 text-left text-xs font-semibold text-darkBlue uppercase tracking-wider w-3/12"
              >
                Statut
              </th>
              <th className="font-redHat px-5 py-3 border-b-2 border-gray-200 bg-gray-100 border-middleBlue/100 bg-middleBlue/60 w-1/12" />
            </tr>
          </thead>
          <tbody>
            {pending
              .filter(
                (pend) =>
                  pend.company_name.includes(searchInput) ||
                  pend.city.includes(searchInput) ||
                  pend.status.includes(searchInput)
              )
              .map((pend) => (
                <SuppliersLines key={pend.supplier_id} human={pend} />
              ))}
          </tbody>
        </table>

        <h2 className="text-2xl font-redHat mt-10  mb-4">Connectés</h2>
        <table className="w-full shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="text-left h-12 shadow-md">
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-middleBlue/100 bg-middleBlue/60 text-left text-xs font-semibold text-darkBlue uppercase tracking-wider w-3/12"
              >
                Nom
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-middleBlue/100 bg-middleBlue/60 text-left text-xs font-semibold text-darkBlue uppercase tracking-wider w-3/12"
              >
                Domaine
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-middleBlue/100 bg-middleBlue/60 text-left text-xs font-semibold text-darkBlue uppercase tracking-wider w-2/12"
              >
                Ville
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-middleBlue/100 bg-middleBlue/60 text-left text-xs font-semibold text-darkBlue uppercase tracking-wider w-3/12"
              >
                Statut
              </th>
              <th className="font-redHat px-5 py-3 border-b-2 border-gray-200 bg-gray-100 border-middleBlue/100 bg-middleBlue/60 w-1/12" />
            </tr>
          </thead>
          <tbody>
            {connected
              .filter(
                (connect) =>
                  connect.company_name.includes(searchInput) ||
                  connect.city.includes(searchInput) ||
                  connect.status.includes(searchInput)
              )
              .map((connect) => (
                <SuppliersLines key={connect.supplier_id} human={connect} />
              ))}
          </tbody>
        </table>
      </div>
      {/* </div> */}
    </main>
  );
}

export default Suppliers;
