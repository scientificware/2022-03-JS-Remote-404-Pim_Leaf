/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/destructuring-assignment */

import ProductsListModal from "@components/retailers/ProductsListModal";

function ModalAddProducts({ products }) {
  return (
    <div className="pl-10 pr-10 pb-5">
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
              Catégorie
            </th>
            <th scope="col" className="bg-middleBlue/70" />
          </tr>
        </thead>
        <tbody>
          {products
            .filter((product) => product.check === true)
            .map((product) => (
              <ProductsListModal
                id={product.id}
                name={product.product_name}
                domain={product.name}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ModalAddProducts;
