/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import FormField from "@components/common/FormField";

import UserExport from "@contexts/UserContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profil() {
  const { user } = useContext(UserExport.UserContext);

  const [datas, setDatas] = useState();
  const [newDatas, setNewDatas] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}user/${user.user_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setDatas(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function updateDatas() {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}user/${user.user_id}/profil`,
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
        Mon profil
      </h1>

      <form>
        <FormField
          name="name"
          label="Nom"
          placeholder={datas && datas.name}
          changeInfos={changeInfos}
        />

        <FormField
          name="mail"
          label="Email de contact"
          placeholder={datas && datas.mail}
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

export default Profil;
