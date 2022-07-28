/* eslint-disable import/no-unresolved */

import { Link } from "react-router-dom";

import { FiArrowRight } from "react-icons/fi";

function SuppliersLines({ human }) {
  return (
    <tr className="text-left border-b">
      <td className="px-5 py-5 bg-white text-sm">
        {human.status === "Connecté" ? (
          <Link to={`/commercant/fournisseur/${human.supplier_id}/details`}>
            {human.company_name}
          </Link>
        ) : (
          <div>{human.company_name}</div>
        )}
      </td>

      <td className="px-5 py-5 bg-white text-sm">{human.domain}</td>

      <td className="px-5 py-5 bg-white text-sm">{human.city}</td>

      <td className="px-5 py-5 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-darkBlue/90 leading-tight">
          {human.status === "En attente de connexion" ? (
            <span
              aria-hidden
              className="absolute inset-0 bg-lightBlue/90 opacity-50
            rounded-full"
            />
          ) : (
            <span
              aria-hidden
              className="absolute inset-0 bg-lightGreen/60 opacity-50
            rounded-full"
            />
          )}

          <span className="relative">{human.status}</span>
        </span>
      </td>
      <td className="px-5 py-5 bg-white text-sm">
        {human.status === "Connecté" ? (
          <Link to={`/commercant/fournisseur/${human.supplier_id}/details`}>
            <button
              type="button"
              className="inline-block text-darkBlue text-xl transition duration-120 ease-out hover:scale-125"
            >
              <FiArrowRight />
            </button>
          </Link>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
}

export default SuppliersLines;
