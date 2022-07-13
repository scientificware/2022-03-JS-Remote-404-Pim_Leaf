/* eslint-disable no-alert */
function ProductsListModal({ name, domain }) {
  return (
    <tr className="odd:bg-lightBlue/10 even:bg-middleBlue/30">
      <td className="pr-32 pl-5 border-y-8 border-darkBlue/95">{name}</td>
      <td className="p-1 border-y-8 border-darkBlue/95">{domain}</td>
      <td className="pl-20 pr-1 border-y-8 border-darkBlue/95" />
    </tr>
  );
}

export default ProductsListModal;
