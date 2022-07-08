/* eslint-disable import/no-unresolved */

import { useContext } from "react";
import { Link } from "react-router-dom";

import SwitchProducts from "@components/common/SwitchProducts";

import UserExport from "@contexts/UserContext";

function ProductsLines({ product, MdDone, handleCheckProducts }) {
  const { user } = useContext(UserExport.UserContext);

  return (
    <tr className="odd:bg-lightBlue/10 even:bg-middleBlue/30 transition ease-in-out hover:bg-lightBlue duration-500">
      <td className="text-left border-y-8 border-white">
        <div
          className={
            product.check
              ? "p-1 pl-3 pr-3 text-lightGreen"
              : "p-1 pl-3 pr-3 text-darkBlue"
          }
        >
          <MdDone onClick={() => handleCheckProducts(product)} />
        </div>
      </td>
      <td className="text-left text-l border-y-8 border-white">
        <Link
          to={
            user.company_group_id === 1
              ? `/commercant/produit/${product.id}/details`
              : `/fournisseur/produit/${product.id}/details`
          }
        >
          {product.product_name}
        </Link>
      </td>
      <td className="text-left text-l border-y-8 border-white">
        {product.supplier}
      </td>
      <td className="text-left text-l border-y-8 border-white">
        {product.name}
      </td>
      <td className="text-left text-l border-y-8 border-white">
        <div className="flex items-center ">
          {product.disponibility !== 0 ? (
            <SwitchProducts disponibility />
          ) : (
            <SwitchProducts disponibility={false} />
          )}
        </div>
      </td>
    </tr>
  );
}

export default ProductsLines;
