/* eslint-disable import/no-unresolved */
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import UserExport from "@contexts/UserContext";

import ProductsDetailsProduct from "@retailersC/ProductsDetailsProduct";
import ProductsDetailsRetailer from "@retailersC/ProductsDetailsRetailer";
import ProductsDetailsSupplier from "@retailersC/ProductsDetailsSupplier";

import ButtonPillDownload from "@components/common/ButtonPillDownload";
import RetourButton from "@assets/retour_button_blue.svg";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductsDetails() {
  const { user } = useContext(UserExport.UserContext);
  const { id } = useParams();

  const [productInfo, setProductInfo] = useState();
  const [supplierInfo, setSupplierInfo] = useState();
  const [retailerInfo, setRetailerInfo] = useState();

  useEffect(() => {
    axios
      // Requête qui récupère les détail du produit grace à l'id provenant du param d'url
      .get(`${import.meta.env.VITE_BACKEND_URL}products/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProductInfo(res.data);
        axios
          .get(
            // Récupère les informations de l'entreprise du fournisseur en fonction de l'id du produit màj dans le state productInfos
            `${import.meta.env.VITE_BACKEND_URL}company/${
              res.data[0].supplier_id
            }`,
            {
              withCredentials: true,
            }
          )
          .then((result) => {
            setSupplierInfo(result.data);
          })
          .catch(() =>
            toast.warning(
              "Un problème est survenue lors du chargement des informations du produit, veuillez réessayer."
            )
          );
      })
      .catch(() =>
        toast.warning(
          "Un problème est survenue lors du chargement de vos données, veuillez réessayer."
        )
      );

    axios
      .get(
        // Récupère les informations qui concerne les conseils et les astuces d'un produit renseignées par le commerçant
        `${import.meta.env.VITE_BACKEND_URL}retailer/${
          user.user_id
        }/stock/${id}`,
        { withCredentials: true }
      )
      .then((res) => {
        setRetailerInfo(res.data);
      })
      .catch(() =>
        toast.warning(
          "Un problème est survenue lors du chargement de vos données, veuillez réessayer."
        )
      );
  }, []);

  if (!productInfo || !supplierInfo || !retailerInfo) {
    return "";
  }

  return (
    <main>
      <h1 className="text-3xl text-center font-bold font-barlow mt-14 mb-8">
        {productInfo[0].product_name}
      </h1>

      <div className="font-redHat w-4/5 m-auto">
        <article className="flex justify-between">
          <Link
            to={
              user.company_group_id === 1
                ? "/commercant/produits"
                : "/fournisseur/produits"
            }
          >
            <img
              src={RetourButton}
              alt="bouton retour"
              className="transition duration-120 ease-out hover:scale-110"
            />
          </Link>
          <div className="flex justify-between align-middle">
            <ButtonPillDownload />
          </div>
        </article>

        <section className="flex flex-col">
          <ProductsDetailsProduct
            detail={productInfo[0].product_details}
            country={productInfo[0].country}
            region={productInfo[0].region}
            advise={productInfo[0].product_advise}
            label={productInfo.labels[0].id}
          />

          <ProductsDetailsSupplier
            company={supplierInfo.company_name}
            description={supplierInfo.description}
            phone={supplierInfo.phone}
            mail={supplierInfo.company_mail}
            address={supplierInfo.address}
            postcode={supplierInfo.postcode}
            city={supplierInfo.city}
            website={supplierInfo.website}
          />

          {user.company_group_id === 1 ? (
            <ProductsDetailsRetailer
              tips={retailerInfo[0].tips}
              recipeIdea={retailerInfo[0].recipe_idea}
            />
          ) : (
            ""
          )}
        </section>
      </div>
    </main>
  );
}

export default ProductsDetails;
