/* eslint-disable import/no-unresolved */
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import FormField from "@components/common/FormField";

import UserExport from "@contexts/UserContext";

function Profil() {
  const { user } = useContext(UserExport.UserContext);

  const [data, setDatas] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}user/${user.user_id}`)
      .then((res) => {
        setDatas(res.data);
      });
  }, []);

  return (
    <main className="font-redHat flex flex-col w-4/5 m-auto">
      <h1 className="flex justify-center text-3xl font-bold font-barlow text-darkBlue mb-14 mt-14">
        Mon profil
      </h1>

      <h2>Mon entreprise : {data && data.company_name}</h2>
      <form>
        <FormField name="Nom" labels="name" placeholder={data && data.name} />

        <FormField
          name="Email de contact"
          labels="email"
          placeholder={data && data.mail}
        />

        <FormField name="Nouveau mot de passe" labels="newPass" />

        <FormField
          name="Confirmer le nouveau mot de passe"
          labels="checkNewPass"
        />
      </form>
      <button
        type="button"
        className="py-6 w-1/4 text-white text-base bg-darkBlue hover:bg-opacity-90 rounded-full  m-auto mt-12"
      >
        Changer mes informations
      </button>
    </main>
  );
}

export default Profil;
