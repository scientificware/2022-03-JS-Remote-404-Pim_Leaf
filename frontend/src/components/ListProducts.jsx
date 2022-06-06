import React from "react";
import TableProducts from "./TableProducts";

function ListProducts({ products }) {
  return (
    <div className="flex flex-col">
      <div className="min-w-full sm:px-6 lg:px-8">
        <table className=" min-w-full mt-40">
          <thead>
            <tr className="text-left h-12">
              <th scope="col" className="bg-middleBlue text-middleBlue text-xl">
                a
              </th>
              <th scope="col" className="bg-middleBlue text-xl ">
                Produit
              </th>
              <th scope="col" className="bg-middleBlue text-xl">
                Fabricant
              </th>
              <th scope="col" className="bg-middleBlue text-xl">
                Catégorie
              </th>
              <th scope="col" className="bg-middleBlue text-xl">
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
