import ListProducts from "../components/ListProducts";
import SearchBarProducts from "../components/SearchBarProducts";

function ProductsSuppliers() {
  return (
    <main>
      <SearchBarProducts />

      <div className="flex justify-center text-3xl font-bold font-barlow mt-20">
        <h1>Mes fiches produits</h1>
      </div>

      <ListProducts />
    </main>
  );
}

export default ProductsSuppliers;
