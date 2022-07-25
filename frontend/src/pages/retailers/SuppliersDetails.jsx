/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-else-return */
/* eslint-disable import/no-unresolved */

import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";

import SearchBar from "@components/common/SearchBar";
import ProductsDetailsSupplier from "@components/retailers/ProductsDetailsSupplier";
import SuppliersDetailsDescription from "@components/retailers/SuppliersDetailsDescription";
import ProductsLines from "@components/common/ProductsLines";
import { MdDone } from "react-icons/md";
import ButtonPillPlus from "@components/common/ButtonPillPlus";
import RetourButtonWhite from "@assets/retour_button_white.svg";
import ModalAddProducts from "@components/retailers/ModalAddProducts";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useState, useContext, useEffect } from "react";

import UserExport from "@contexts/UserContext";

function SuppliersDetails() {
  const { id } = useParams();
  const { user } = useContext(UserExport.UserContext);
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);
  const [supplier, setSupplier] = useState();

  const contentStyle = {
    height: "auto",
    overlfow: "scroll", // <-- This tells the modal to scroll
  };

  const handleCheckProducts = (prod) => {
    const newProduct = [...products];
    const index = newProduct.indexOf(prod);
    newProduct[index].check = !newProduct[index].check;
    setProducts(newProduct);
  };
  const addProducts = products
    .filter((product) => product.check === true)
    .map((product) => ({
      product_id: product.id,
      owner_id: `${user.user_id}`,
      supplier_id: product.supplier_id,
      disponibility: "1",
    }));

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}company/${user.user_id}`, {
        withCredentials: true,
      })
      .then((res) => setSupplier(res.data));

    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}retailer/${
          user.user_id
        }/supplier/${id}/stock`,
        { withCredentials: true }
      )
      .then((res) => {
        const prod = res.data.map((el) => ({ ...el, check: false }));
        setProducts(prod);
      })
      .catch((error) => {
        console.warn(error.response.data);
      });
  }, []);

  const handleClick = (prod) => {
    const productToGet = [];
    const productToDelete = [];
    for (let i = 0; i < prod.length; i += 1) {
      prod[i].check
        ? productToDelete.push(prod[i])
        : productToGet.push(prod[i]);
    }
    setProducts(productToGet);
    for (let i = 0; i < addProducts.length; i++) {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}retailer/${user.user_id}/stock`,
          addProducts[i],
          { withCredentials: true }
        )
        .then(() =>
          toast.success(`${products[i].product_name} a été ajouté avec succès`)
        )
        .catch(() =>
          toast.warning(
            "Un problème est survenu durant l'ajout des produits, veuillez réessayer"
          )
        );
    }
  };

  if (supplier) {
    return (
      <main>
        <h1 className="text-3xl text-center font-bold font-barlow mt-14 mb-8">
          {supplier.company_name}
        </h1>

        <div className="flex flex-col font-redHat w-3/4 m-auto">
          <SuppliersDetailsDescription description={supplier.description} />

          <ProductsDetailsSupplier
            company={supplier.company_name}
            description={supplier.description}
            phone={supplier.phone}
            mail={supplier.company_mail}
            address={supplier.address}
            postcode={supplier.postcode}
            city={supplier.city}
            website={supplier.website}
          />

          <div className="mt-10">
            <SearchBar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </div>
          <Popup
            trigger={
              <div className="flex flex-row justify-end pb-5">
                <ButtonPillPlus />
              </div>
            }
            modal
            contentStyle={contentStyle}
          >
            {(close) => (
              <div className=" bg-darkBlue opacity-95 text-white">
                <div>
                  <div className="pl-5 pr-5 pb-5">
                    <button type="button" onClick={close}>
                      <img
                        src={RetourButtonWhite}
                        alt="Bouton Retour"
                        className="w-25 justify-start transition duration-120 ease-out hover:scale-105"
                      />
                    </button>
                    <h1 className="flex justify-center text-2xl">
                      Ajouter ces produits à votre stock:
                    </h1>
                  </div>
                  <div className="flex justify-center overflow-y-scroll h-5/6">
                    <ModalAddProducts
                      products={products}
                      handleClick={handleClick}
                    />
                  </div>
                </div>
                <div className="flex justify-center pb-5">
                  <button
                    type="button"
                    onClick={() => handleClick(products)}
                    className="bg-white text-darkBlue p-1 rounded-2xl flex transition duration-120 ease-out hover:bg-middleBlue mb-2 mt-2 active:bg-lightGreen opacity-80"
                  >
                    Confirmer
                  </button>
                </div>
              </div>
            )}
          </Popup>

          <table className="w-full mb-20">
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
  } else {
    return null;
  }
}

export default SuppliersDetails;
