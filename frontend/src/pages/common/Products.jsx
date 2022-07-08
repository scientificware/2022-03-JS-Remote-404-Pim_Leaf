/* eslint-disable import/no-unresolved */

import ProductsTable from "@components/common/ProductsTable";

function Products() {
  return (
    <main>
      <div className="flex justify-center text-3xl font-bold font-barlow">
        <h1 className="mb-8 mt-14">Mes fiches produits</h1>
      </div>

      <ProductsTable />
    </main>
  );
}

export default Products;
