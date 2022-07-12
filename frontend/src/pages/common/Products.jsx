/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-unresolved */
import { useState, useEffect, useContext } from "react";
import { MdDone } from "react-icons/md";
import axios from "axios";
import Popup from "reactjs-popup";

import UserExport from "@contexts/UserContext";

import SearchBarProducts from "@components/common/SearchBarProducts";
import ProductsLines from "@components/common/ProductsLines";
import RetourButtonWhite from "@assets/retour_button_white.svg";
import ButtonPillMinus from "@components/common/ButtonPillMinus";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { user } = useContext(UserExport.UserContext);
  console.log(user);

  const handleCheckProducts = (prod) => {
    const newProduct = [...products];
    const index = newProduct.indexOf(prod);
    newProduct[index].check = !newProduct[index].check;
    setProducts(newProduct);
  };

  const contentStyle = {
    height: "auto",
    overlfow: "scroll", // <-- This tells the modal to scroll
  };

  const handleClickMinus = (prod) => {
    const productToGet = [];
    const productToDelete = [];
    for (let i = 0; i < prod.length; i += 1) {
      prod[i].check
        ? productToDelete.push(prod[i])
        : productToGet.push(prod[i]);
    }
    setProducts(productToGet);
    const filterProducts = products.filter((product) => product.check === true);
    for (let i = 0; i < products.length; i++) {
      axios
        .delete(
          `${import.meta.env.VITE_BACKEND_URL}retailer/stock/${
            filterProducts[i].stock_id
          }`
        )
        .then(() => alert("Les produits ont été supprimés avec succès"))
        .catch((error) => {
          console.warn(error.response.data);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}user/${user.user_id}/products`)
      .then((res) => {
        const prod = res.data.map((el) => ({ ...el, check: false }));
        setProducts(prod);
      })
      .catch((error) => {
        console.warn(error.response.data);
      });
  }, []);

  return (
    <main>
      <h1 className="text-3xl text-center font-bold font-barlow mt-14 mb-8">
        Mes fiches produits
      </h1>

      {/* <ProductsTable /> */}
      <SearchBarProducts
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      <div className="font-redHat w-4/5 m-auto">
        <div className="flex flex-row justify-end">
          {user.company_group_id === 1 ? (
            <Popup
              trigger={
                <div className="flex flex-row justify-end pb-5">
                  <ButtonPillMinus />
                </div>
              }
              modal
              contentStyle={contentStyle}
            >
              {(close) => (
                <div className=" bg-darkBlue opacity-95 text-white flex flex-col items-center">
                  <button type="button" onClick={close}>
                    <img
                      src={RetourButtonWhite}
                      alt="Bouton Retour"
                      className="w-25 flex justify-start transition duration-120 ease-out hover:scale-105"
                    />
                  </button>
                  <h1 className="p-10 flex justify-center text-2xl">
                    Vous êtes sur le point de supprimer ces produits de votre
                    stock:
                  </h1>
                  {products
                    .filter((product) => product.check === true)
                    .map((product) => (
                      <div id={product.id}>
                        <p>{product.product_name}</p>
                        <p>{product.supplier}</p>
                        <p>{product.name}</p>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={() => handleClickMinus(products)}
                    className="bg-white w-20 text-darkBlue p-1 rounded-2xl transition duration-120 ease-out hover:bg-middleBlue mb-2 mt-2  focus:bg-lightGreen opacity-80"
                  >
                    Confirmer
                  </button>
                </div>
              )}
            </Popup>
          ) : (
            <div className="text-white h-12">.</div>
          )}
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left h-12 shadow-md">
              <th
                scope="col"
                className="bg-middleBlue/70 text-middleBlue/0 text-l uppercase"
              />
              <th scope="col" className="bg-middleBlue/70 text-l uppercase">
                Produit
              </th>
              <th scope="col" className="bg-middleBlue/70 text-l uppercase">
                {user.company_group_id === 1 ? "Fournisseur" : "Fabricant"}
              </th>
              <th scope="col" className="bg-middleBlue/70 text-l uppercase">
                Catégorie
              </th>
              <th scope="col" className="bg-middleBlue/70 text-l uppercase">
                Disponibilité
              </th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter(
                (product) =>
                  product.product_name.includes(searchInput) ||
                  product.supplier.includes(searchInput) ||
                  product.name.includes(searchInput)
              )
              .map((product) => (
                <ProductsLines
                  key={product.id}
                  product={product}
                  MdDone={MdDone}
                  handleCheckProducts={handleCheckProducts}
                />
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Products;
