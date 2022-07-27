/* eslint-disable import/no-unresolved */
import { useState, useContext } from "react";
import FormField from "@components/common/FormField";
import axios from "axios";

import UserExport from "@contexts/UserContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categorie = [
  { id: 1, name: "Boisson" },
  { id: 2, name: "Epicerie sucrée" },
  { id: 3, name: "Epicerie salée" },
  { id: 4, name: "Produit frais" },
  { id: 5, name: "Conserve" },
  { id: 6, name: "Cosmétique/hygiène/entretien" },
  { id: 7, name: "Accessoire" },
  { id: 8, name: "Autre" },
  { id: 9, name: "Epices" },
  { id: 10, name: "Huile et condiments" },
];

const origin = [
  { id: 1, country: "France", region: "Alsace" },
  { id: 2, country: "UE/NonUE", region: null },
  { id: 3, country: "Afrique du Sud", region: null },
  { id: 4, country: "Inde", region: null },
  { id: 5, country: "Ethiopie", region: null },
  { id: 6, country: "Guatemala", region: null },
  { id: 7, country: "Inde", region: null },
  { id: 10, country: "France", region: "Drome" },
];

function ModalCreateProduct() {
  const { user } = useContext(UserExport.UserContext);

  const [categorieSelected, setCategorieSelected] = useState(1);
  const [originSelected, setOriginSelected] = useState(1);

  const [datas, setDatas] = useState({});

  const changeInfos = (event) => {
    const changeDatas = { ...datas };
    changeDatas[event.target.name] = event.target.value;
    setDatas({
      ...datas,
      ...changeDatas,
    });
  };

  const handleClickConfirm = () => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}supplier/${user.company_id}/stock`,
        {
          product_name: datas.product_name,
          detail: datas.detail,
          advise: datas.advise,
          category_id: categorieSelected,
          origin_id: originSelected,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        toast.success(`Votre produit a été ajouté avec succès.`);
      })
      .catch(() => toast.error("Un problème est survenu, veuillez réessayer."));
  };

  const handleChangeCategorie = (event) => {
    setCategorieSelected(event.target.value);
  };

  const handleChangeOrigin = (event) => {
    setOriginSelected(event.target.value);
  };

  return (
    <>
      <form className="w-4/5 m-auto">
        <FormField
          name="product_name"
          label="Nom du produit"
          placeholder=""
          changeInfos={changeInfos}
        />
        <FormField
          name="detail"
          label="Détails sur le produit"
          placeholder=""
          changeInfos={changeInfos}
        />
        <FormField
          name="advise"
          label="Conseils"
          placeholder=""
          changeInfos={changeInfos}
        />
        <FormField
          name="manufacturing_method"
          label="Méthode de fabrication"
          placeholder=""
          changeInfos={changeInfos}
        />
        <label htmlFor="category" className="text-xl font-bold flex flex-col">
          Catégorie du produit
          <select
            name="category"
            className=" bg-opacity-50 text-darkBlue p-2 mt-1 mb-3 shadow-lg"
            onChange={(e) => handleChangeCategorie(e)}
          >
            {categorie.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="origin" className="text-xl font-bold flex flex-col">
          Origine du produit
          <select
            name="origin"
            className=" bg-opacity-50 text-darkBlue p-2 mt-1 mb-3 shadow-lg"
            onChange={(e) => handleChangeOrigin(e)}
          >
            {origin.map((or) => (
              <option key={origin.id} value={or.id}>
                {or.country} {or.region}
              </option>
            ))}
          </select>
        </label>
      </form>
      <div className="flex justify-center pb-5">
        <button
          type="button"
          onClick={() => handleClickConfirm()}
          className="bg-white w-40 text-darkBlue p-4 rounded-full transition duration-120 ease-out hover:bg-middleBlue my-2 active:bg-lightGreen opacity-80"
        >
          Confirmer
        </button>
      </div>
    </>
  );
}

export default ModalCreateProduct;
