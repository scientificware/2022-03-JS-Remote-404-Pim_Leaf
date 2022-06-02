import React from "react";
import SwitchButtonProducts from "./SwitchButtonProducts";

function TableProducts({ product }) {
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <tr className="odd:bg-lightBlue even:bg-white">
      <td className="text-left border-l-2">
        <input
          className="w-5 h-10 ml-5"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
      </td>
      <td className="text-left text-l border-l-2">{product.product}</td>
      <td className="text-left text-l border-l-2">{product.fabricant}</td>
      <td className="text-left text-l  border-l-2">{product.category}</td>
      <td className="items-center border-l-2 border-r-2">
        {product.disponiblity}
        <SwitchButtonProducts />
      </td>
    </tr>
  );
}

export default TableProducts;
