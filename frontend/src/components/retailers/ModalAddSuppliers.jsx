/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/destructuring-assignment */

import SuppliersListModal from "@components/retailers/SuppliersListModal";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserExport from "../../contexts/UserContext";

function ModalAddSuppliers({ searchInput, connected, pending }) {
  const { user } = useContext(UserExport.UserContext);

  const [suppliers, setSuppliers] = useState([]);

  const connectId = connected.map((connect) => connect.supplier_id);
  const pendId = pending.map((pend) => pend.supplier_id);
  const compare = [...connectId, ...pendId];
  const [handleClick, sethandleClick] = useState(false);

  useEffect(() => {
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
    <div className="pl-10 pr-10 pb-10">
      <table>
        <thead>
          <tr>
            <th
              scope="col"
              className="bg-middleBlue/70  text-l uppercase text-left pl-5"
            >
              Nom
            </th>
            <th scope="col" className="bg-middleBlue/70 text-l uppercase">
              Cathégorie
            </th>
            <th scope="col" className="bg-middleBlue/70" />
          </tr>
        </thead>
        <tbody>
          {suppliers &&
            suppliers
              .filter((supplier) => !compare.includes(supplier.company_id))
              .filter(
                (supplier) =>
                  supplier.company_name.includes(searchInput) ||
                  supplier.domain.includes(searchInput)
              )
              .map((supplier) => (
                <SuppliersListModal
                  id={supplier.company_id}
                  name={supplier.company_name}
                  domaine={supplier.domain}
                  sethandleClick={sethandleClick}
                  handleClick={handleClick}
                  user={user}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default ModalAddSuppliers;
