/* eslint-disable import/no-unresolved */
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import UserExport from "@contexts/UserContext";

import ProductsDetailsProduct from "@retailersC/ProductsDetailsProduct";
import ProductsDetailsRetailer from "@retailersC/ProductsDetailsRetailer";
import ProductsDetailsSupplier from "@retailersC/ProductsDetailsSupplier";

import ButtonIcons from "@components/common/ButtonIcons";
import RetourButton from "@assets/retour_button_blue.svg";

function ProductsDetails() {
  const icon = ["edit", "download"];

  const { user } = useContext(UserExport.UserContext);
  const { id } = useParams();

  const [productInfo, setProductInfo] = useState();
  const [supplierInfo, setSupplierInfo] = useState();
  const [retailerInfo, setRetailerInfo] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}products/${id}`)
      .then((res) => {
        setProductInfo(res.data);
      });
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}company/${user.company_id}`)
      .then((res) => {
        setRetailerInfo(res.data);
      });
  }, []);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}company/4`).then((res) => {
      setSupplierInfo(res.data);
    });
  }, []);

  if (!productInfo) {
    return <p>Wait a bit here</p>;
  }
  if (!supplierInfo) {
    return <p>Wait a bit here</p>;
  }
  if (!retailerInfo) {
    return <p>Wait a bit here</p>;
  }

  return (
    <main>
      <h1 className="flex justify-center text-3xl font-bold font-barlow">
        {productInfo.product_name}
      </h1>
      <article className="flex justify-around pt-16">
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
            className="w-1/2 transition duration-120 ease-out hover:scale-110 ml-36"
          />
        </Link>
        <div className="w-1/6 flex justify-between align-middle">
          {icon.map((i) => (
            <ButtonIcons icon={i} />
          ))}
        </div>
      </article>

      <section>
        <ProductsDetailsProduct
          detail={productInfo.product_details}
          country={productInfo.country}
          region={productInfo.region}
          advise={productInfo.product_advise}
          label={productInfo.label_name}
        />

        <ProductsDetailsSupplier
          company={supplierInfo.company_name}
          description={supplierInfo.description}
          phone={supplierInfo.phone}
          mail={supplierInfo.company_mail}
          address={supplierInfo.address}
          postcode={supplierInfo.postcode}
        />

        <ProductsDetailsRetailer
          advise={retailerInfo.advise}
          recipeIdea={retailerInfo.recipe_idea}
        />
      </section>
    </main>
  );
}

export default ProductsDetails;
