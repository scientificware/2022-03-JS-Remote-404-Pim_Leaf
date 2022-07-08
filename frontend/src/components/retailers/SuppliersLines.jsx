/* eslint-disable import/no-unresolved */

import { Link } from "react-router-dom";

function SuppliersLines({ human }) {
  return (
    <tr className="odd:bg-lightBlue/10 even:bg-middleBlue/30 transition ease-in-out hover:bg-lightBlue duration-500 text-left">
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <Link to={`/commercant/fournisseur/${human.supplier_id}/details`}>
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
        <span className="relative inline-block px-3 py-1 font-semibold text-darkBlue/90 leading-tight">
          <span
            aria-hidden
            className="absolute inset-0 bg-lightGreen/60 opacity-50 rounded-full"
          />
          <span className="relative">{human.status}</span>
        </span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          type="button"
          className="inline-block text-lightGrey hover:text-darkBlue"
        >
          <svg
            className="inline-block h-6 w-6 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default SuppliersLines;
