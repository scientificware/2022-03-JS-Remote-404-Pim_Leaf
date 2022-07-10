/* eslint-disable import/no-unresolved */

import { Link } from "react-router-dom";

import { FiArrowRight } from "react-icons/fi";

function ClientsLinesToAnswer({ human, action }) {
  return (
    <tr className="odd:bg-lightBlue/10 even:bg-middleBlue/30 transition ease-in-out hover:bg-lightBlue duration-500 text-left">
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <Link to={`/fournisseur/client/${human.retailer_id}/details`}>
          {human.company_name}
        </Link>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {human.domain}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {human.city}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          type="button"
          className="w-1/3 float-left bg-buttonOrange p-1 mx-2 rounded-full"
          onClick={action}
        >
          Accepter
        </button>

        <button
          type="button"
          className="w-1/3 float-left bg-buttonRed p-1 mx-2 rounded-full"
          onClick={action}
        >
          Refuser
        </button>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          type="button"
          className="inline-block text-darkBlue text-xl transition duration-120 ease-out hover:scale-125"
        >
          <FiArrowRight />
        </button>
      </td>
    </tr>
  );
}

export default ClientsLinesToAnswer;
