/* eslint-disable import/no-unresolved */

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SearchBarHumans from "@components/common/SearchBarHumans";
import SuppliersLines from "@components/retailers/SuppliersLines";

import UserExport from "@contexts/UserContext";

function Suppliers() {
  const { user } = useContext(UserExport.UserContext);

  const [humans, setHumans] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}retailer/${
          user.user_id
        }/suppliers/connected`
      )
      .then((res) => {
        setHumans(res.data);
      })
      .catch((error) => {
        console.warn(error.response.data);
      });
  }, []);

  return (
    <main>
      <h1 className="text-3xl text-center font-bold font-barlow mt-20">
        Mes Fournisseurs
      </h1>

      <SearchBarHumans
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      <table className="w-4/5">
        <thead>
          <tr className="text-left h-12 shadow-md">
            <th scope="col" className="bg-middleBlue/70 text-left uppercase">
              Nom
            </th>
            <th scope="col" className="bg-middleBlue/70 text-left uppercase">
              Domaine
            </th>
            <th scope="col" className="bg-middleBlue/70 text-left uppercase">
              Ville
            </th>
            <th scope="col" className="bg-middleBlue/70 text-left uppercase">
              Statut
            </th>
            <th scope="col" className="bg-middleBlue/70 text-left uppercase">
              WHATelse
            </th>
          </tr>
        </thead>
        <tbody>
          {humans
            .filter(
              (human) =>
                human.company_name.includes(searchInput) ||
                human.city.includes(searchInput) ||
                human.status.includes(searchInput)
            )
            .map((human) => (
              <SuppliersLines key={human.supplier_id} human={human} />
            ))}
        </tbody>
      </table>
    </main>
  );
}

export default Suppliers;
