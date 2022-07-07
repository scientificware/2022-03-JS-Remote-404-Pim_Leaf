/* eslint-disable import/no-unresolved */

import { Link } from "react-router-dom";

function SuppliersLines({ human }) {
  return (
    <tr className="odd:bg-lightBlue/10 even:bg-middleBlue/30 transition ease-in-out hover:bg-lightBlue duration-500 text-left">
      <td className="text-left text-l border-y-8 border-white">
        <Link to={`/commercant/fournisseur/${human.supplier_id}`}>
          {human.company_name}
        </Link>
      </td>

      <td className="text-left text-l border-y-8 border-white">
        {human.domain}
      </td>

      <td className="text-left text-l border-y-8 border-white">{human.city}</td>

      <td className="text-left text-l border-y-8 border-white">
        {human.status}
      </td>
      <td className="text-left text-l border-y-8 border-white">
        {human.status}
      </td>
    </tr>
  );
}

export default SuppliersLines;
