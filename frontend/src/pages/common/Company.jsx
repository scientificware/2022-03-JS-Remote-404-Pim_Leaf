/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import FormField from "@components/common/FormField";

import UserExport from "@contexts/UserContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Company() {
  const { user } = useContext(UserExport.UserContext);

  const [datas, setDatas] = useState();
  const [newDatas, setNewDatas] = useState();

  useEffect(() => {
    axios
      // Cette requête permet de récupérer les informations sur l'entreprise de l'utilisateur
      .get(`${import.meta.env.VITE_BACKEND_URL}company/${user.user_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setDatas(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // La fonction updateDatas() permet de modifier les informations sur l'entreprise de l'utilisateur
  // Elle est appelé sur le onClick du bouton "Enregistrer"
  function updateDatas() {
    axios
      // Cette requête permet de modifier les informations de l'entreprise de l'utilisateur
      .put(
        `${import.meta.env.VITE_BACKEND_URL}company/${user.user_id}`,
        newDatas,
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Vos données ont bien été modifiées.");
      })
      .catch(() => toast.warning("Vos données n'ont pas pu être modifiées."));
  }

  const changeInfos = (event) => {
    const changeDatas = { ...newDatas };
    changeDatas[event.target.name] = event.target.value;
    setNewDatas(changeDatas);
    setDatas({ ...datas, ...changeDatas });
  };

  if (!datas) return "Données en cours de chargement";

  return (
    <main className="font-redHat flex flex-col w-4/5 m-auto">
      <h1 className="flex justify-center text-3xl font-bold font-barlow text-darkBlue mb-14 mt-14">
        Mon entreprise
      </h1>

      <form>
        <FormField
          name="company_name"
          label="Nom de l'entreprise"
          placeholder={datas && datas.company_name}
          changeInfos={changeInfos}
        />
        <div className="text-xl font-bold">Domaine d{`'`}activité</div>
        <div className="bg-middleBlue bg-opacity-50 text-darkBlue p-2 mt-1 mb-3 shadow-lg placeholder-darkBlue">
          <p>{datas && datas.domain}</p>
        </div>

        <FormField
          name="description"
          label="Description"
          placeholder={datas && datas.description}
          changeInfos={changeInfos}
        />
        <fieldset className="flex justify-between">
          <div className="w-2/6">
            <FormField
              name="address"
              label="Adresse"
              placeholder={datas && datas.address}
              changeInfos={changeInfos}
            />
          </div>
          <div className="w-1/6">
            <FormField
              name="postcode"
              label="Code postal"
              placeholder={datas && datas.postcode}
              changeInfos={changeInfos}
            />
          </div>
          <div className="w-2/6">
            <FormField
              name="city"
              label="Ville"
              placeholder={datas && datas.city}
              changeInfos={changeInfos}
            />
          </div>
        </fieldset>

        <FormField
          name="company_mail"
          label="E-mail"
          placeholder={datas && datas.company_mail}
          changeInfos={changeInfos}
        />

        <FormField
          name="phone"
          label="Téléphone de l'entreprise"
          placeholder={datas && datas.phone}
          changeInfos={changeInfos}
        />
      </form>

      <button
        onClick={() => updateDatas()}
        type="button"
        className="py-6 w-1/4 text-white text-base bg-darkBlue hover:bg-opacity-80 rounded-full  m-auto my-12"
      >
        Enregistrer
      </button>
    </main>
  );
}

export default Company;
