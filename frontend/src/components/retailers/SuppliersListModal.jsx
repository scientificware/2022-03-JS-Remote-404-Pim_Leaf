/* eslint-disable no-alert */
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import UserExport from "../../contexts/UserContext";

function SuppliersListModal({ supplierId, name, domaine }) {
  const { user } = useContext(UserExport.UserContext);

  const [postedId, setPostedId] = useState({});
  const [handleClick, sethandleClick] = useState(false);
  const changeStatus = () => {
    setPostedId({
      retailer_id: `${user.user_id}`,
      supplier_id: `${supplierId}`,
    });
    sethandleClick(true);
  };

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}retailer/connection`, {
        postedId,
      })
      .then(() => {
        alert("votre message demande de connaxion a été prise en compte");
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [postedId]);

  return (
    <tr className="odd:bg-lightBlue/10 even:bg-middleBlue/30">
      <td className="pr-32 pl-5 border-y-8 border-darkBlue/95">{name}</td>
      <td className="p-1 border-y-8 border-darkBlue/95">{domaine}</td>
      <td className="pl-20 pr-20 border-y-8 border-darkBlue/95">
        {handleClick ? (
          <button
            type="button"
            className="bg-white text-darkBlue p-1 rounded-2xl flex transition duration-120 ease-out hover:bg-middleBlue mb-2 mt-2  focus:bg-lightGreen opacity-80"
            onClick={() => {
              changeStatus();
            }}
          >
            Demande Envoyée
          </button>
        ) : (
          <button
            type="button"
            className="bg-white text-darkBlue p-1 rounded-2xl flex transition duration-120 ease-out hover:bg-middleBlue mb-2 mt-2"
            onClick={() => {
              changeStatus();
            }}
          >
            Se Connecter
          </button>
        )}
      </td>
    </tr>
  );
}

export default SuppliersListModal;
