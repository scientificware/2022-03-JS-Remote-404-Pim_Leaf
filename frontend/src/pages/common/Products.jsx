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
import ButtonPillPlus from "@components/common/ButtonPillPlus";
import ModalAddProducts from "@components/retailers/ModalAddProducts";
import ModalCreateProduct from "@components/retailers/ModalCreateProduct";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { user } = useContext(UserExport.UserContext);

  // La fonction handleCheckProducts permet de modifier le state setProduct en modifiant la clé { check : false } en { check : true }
  // Elle prendra en argument le state products

  const handleCheckProducts = (prod) => {
    const newProduct = [...products];
    const index = newProduct.indexOf(prod);
    newProduct[index].check = !newProduct[index].check;
    setProducts(newProduct);
  };

  const contentStyle = {
    overlfow: "scroll", // <-- This tells the modal to scroll
    width: "50%",
    height: "auto",
  };

  // La fonction handleClickMinus a pour but de filtrer les produits ayant la clé {check : true }
  // Elle va permettre de supprimer les produits avec cette clé du stock de l'utilisateur
  // Elle prendra en argument le state products
  // Cette fonction sera appelée sur le OnClick du bouton Confirmer de la modal

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
        // Cette requête supprime les produits { check : true } du stock de l'utilisateur
        .delete(
          `${import.meta.env.VITE_BACKEND_URL}retailer/stock/${
            filterProducts[i].stock_id
          }`,
          { withCredentials: true }
        )
        .then(() => {
          toast.success(`${products[i].product_name} a bien été supprimé.`);
        })
        .catch(() =>
          toast.error("Un problème est survenue, veuillez réessayer.")
        );
    }
  };

  useEffect(() => {
    axios
      // Cette requête récupère les produits présent dans le stock de l'utilisateur
      .get(`${import.meta.env.VITE_BACKEND_URL}user/${user.user_id}/products`, {
        withCredentials: true,
      })
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
            // Modal Delete Product For Retailers
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
                <div className="bg-darkBlue opacity-95 text-white">
                  <div className="pl-5 pr-5 pb-5">
                    <button type="button" onClick={close}>
                      <img
                        src={RetourButtonWhite}
                        alt="Bouton Retour"
                        className="w-25 flex justify-start transition duration-120 ease-out hover:scale-105"
                      />
                    </button>
                    <h1 className="flex justify-center text-2xl">
                      Voulez-vous supprimer ces produits de votre stock :
                    </h1>
                  </div>
                  <div className="flex justify-center pb-5">
                    <ModalAddProducts
                      products={products}
                      handleClick={handleClickMinus}
                    />
                  </div>
                  <div className="flex justify-center pb-5">
                    <button
                      type="button"
                      onClick={() => handleClickMinus(products)}
                      className="bg-white w-40 text-darkBlue p-4 rounded-full transition duration-120 ease-out hover:bg-middleBlue my-2 active:bg-lightGreen opacity-80"
                    >
                      Confirmer
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          ) : (
            // Modal add Product For Suppliers
            <Popup
              trigger={
                <div className="flex flex-row justify-end">
                  <ButtonPillPlus />
                </div>
              }
              modal
              contentStyle={contentStyle}
            >
              {(close) => (
                <div className="bg-darkBlue opacity-95 text-white">
                  <div className="pl-5 pr-5 pb-5">
                    <button type="button" onClick={close}>
                      <img
                        src={RetourButtonWhite}
                        alt="Bouton Retour"
                        className="w-25 flex justify-start transition duration-120 ease-out hover:scale-105"
                      />
                    </button>
                    <h1 className="flex justify-center text-2xl">
                      Ajouter un produit :
                    </h1>
                  </div>
                  <div className="flex justify-center flex-col">
                    <ModalCreateProduct />
                  </div>
                </div>
              )}
            </Popup>
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
