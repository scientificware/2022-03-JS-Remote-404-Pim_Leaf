import { useState, useEffect } from "react";
import axios from "axios";

function ProductsTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}products`)
      .then((res) => {
        const prod = res.data.map((el) => ({ ...el, check: false }));
        setProducts(prod);
      })
      .catch((error) => {
        console.warn(error.response.data);
      });
  }, []);

  return (
    <>
      <div className="ml-12">
        <p>
          Connecté en tant que : <b>Eco Vrac</b>
        </p>
        <p>
          Produits de : <b>Nat-ali</b> et <b>Epice Scop</b>
        </p>
      </div>
      <main>{products}</main>
    </>
  );
}
export default ProductsTable;
