import React from "react";
import TableProducts from "./TableProducts";

function ListProducts({ products }) {
  return (
    <div className="flex flex-col">
      <div className="min-w-full sm:px-6 lg:px-8">
        <table className="min-w-full mt-40 border-2">
          <thead>
            <tr className="text-left">
              <th scope="col" className="bg-middleBlue text-middleBlue text-xl">
                a
              </th>
              <th scope="col" className="bg-middleBlue text-xl border-l-2">
                Produit
              </th>
              <th scope="col" className="bg-middleBlue text-xl border-l-2">
                Fabricant
              </th>
              <th scope="col" className="bg-middleBlue text-xl border-l-2">
                Catégorie
              </th>
              <th
                scope="col"
                className="bg-middleBlue text-xl border-l-2 border-r-2"
              >
                Disponibilité
              </th>
            </tr>
          </thead>
          <tbody className="">
            {/* //   map the dataProducts for each product */}
            {products.map((product) => (
              <TableProducts key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListProducts;
