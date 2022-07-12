/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-unresolved */

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SearchBar from "@components/common/SearchBarProducts";
import ClientsLines from "@components/suppliers/ClientsLines";
import ClientsLinesToAnswer from "@components/suppliers/ClientsLinesToAnswer";

import UserExport from "@contexts/UserContext";

function Clients() {
  const { user } = useContext(UserExport.UserContext);

  const [searchInput, setSearchInput] = useState("");

  const [connected, setConnected] = useState([]);
  const [pending, setPending] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}supplier/${
          user.user_id
        }/clients/connected`
      )
      .then((res) => {
        setConnected(res.data);
      })
      .catch((error) => {
        console.warn(error.response.data);
      });

    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}supplier/${
          user.user_id
        }/clients/pending`
      )
      .then((res) => {
        setPending(res.data);
      })
      .catch((error) => {
        console.warn(error.response.data);
      });
  }, []);

  const handleClickAccepted = (human) => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}supplier/clients/pending/${
          human.id
        }`
      )
      .then((res) => {
        if (res.data === "connection has been updated") {
          setConnected([...connected, { ...human, status: "Connecté" }]);
          setPending(pending.filter((pend) => pend.id !== human.id));
        }
      })
      .catch((err) => console.error(err));
  };
  const handleClickRefused = (human) => {
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}supplier/clients/pending/${
          human.id
        }`
      )
      .then((res) => {
        if (res.data === "connection has been deleted") {
          setPending(pending.filter((pend) => pend.id !== human.id));
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <main>
      <h1 className="text-3xl text-center font-bold font-barlow mt-14 mb-8">
        Mes Clients
      </h1>

      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />

      <div className="font-redHat w-4/5 m-auto">
        <h2 className="text-2xl font-redHat mb-4">
          En attente de confirmation
        </h2>
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
                Réponse
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
              .map((pend, index) => (
                <ClientsLinesToAnswer
                  key={index}
                  human={pend}
                  handleClickAccepted={handleClickAccepted}
                  handleClickRefused={handleClickRefused}
                />
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
              .map((connect, index) => (
                <ClientsLines key={index} human={connect} />
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Clients;
