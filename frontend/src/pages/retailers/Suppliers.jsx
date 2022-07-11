/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-unresolved */

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import SearchBarHumans from "@components/common/SearchBarHumans";
import SuppliersLines from "@components/retailers/SuppliersLines";
import ModalAddSuppliers from "@components/retailers/ModalAddSuppliers";

import ButtonPillPlus from "@components/common/ButtonPillPlus";
import RetourButtonWhite from "@assets/retour_button_white.svg";

import UserExport from "@contexts/UserContext";

function Suppliers() {
  const { user } = useContext(UserExport.UserContext);

  const [searchInput, setSearchInput] = useState("");

  const [connected, setConnected] = useState([]);
  const [pending, setPending] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const contentStyle = {
    height: "auto",
    overlfow: "scroll", // <-- This tells the modal to scroll
  };

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

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}retailer/suppliers`)
      .then((res) => {
        setSuppliers(res.data);
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
            {pending &&
              pending
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
            {connected &&
              connected
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

      <Popup
        trigger={
          <div className="flex flex-row justify-end">
            <ButtonPillPlus />
          </div>
        }
        modal
        contentStyle={contentStyle}
      >
        {(close) => (
          <div className=" bg-darkBlue opacity-95 text-white">
            {" "}
            <div className="flexs pl-5 pr-5">
              <button type="button" onClick={close}>
                <img
                  src={RetourButtonWhite}
                  alt="Bouton Retour"
                  className="w-25 justify-start transition duration-120 ease-out hover:scale-105"
                />
              </button>
              <h1 className="flex justify-center pb-4 text-2xl">
                Rechercher mon fournisseur
              </h1>
            </div>
            <div className=" mb-10 mt-5">
              <SearchBarHumans
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            </div>
            <div className="flex justify-center overflow-y-scroll h-5/6">
              <ModalAddSuppliers
                suppliers={suppliers}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                connected={connected}
                pending={pending}
              />
            </div>
          </div>
        )}
      </Popup>
    </main>
  );
}

export default Suppliers;
