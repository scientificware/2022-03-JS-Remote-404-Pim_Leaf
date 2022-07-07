/* eslint-disable import/no-unresolved */
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import FormField from "@components/common/FormField";

import UserExport from "@contexts/UserContext";

function Company() {
  const { user } = useContext(UserExport.UserContext);

  const [data, setDatas] = useState();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}company/${user.company_group_id}`
      )
      .then((res) => {
        setDatas(res.data);
      });
  }, []);

  return (
    <main className="font-redHat flex flex-col w-4/5 m-auto">
      <h1 className="flex justify-center text-3xl font-bold font-barlow text-darkBlue mb-14 mt-14">
        Mon entreprise
      </h1>

      <form>
        <FormField
          name="Nom"
          labels="name"
          placeholder={user && user.company_name}
        />

        <FormField
          name="Domaine d'activité"
          labels="domain"
          placeholder={data && data.domain}
        />

        <FormField
          name="Description"
          labels="description"
          placeholder={data && data.description}
        />
        <fieldset className="flex justify-between">
          <FormField
            name="Adresse"
            labels="address"
            placeholder={data && data.address}
          />

          <FormField
            name="Code postal"
            labels="postcode"
            placeholder={data && data.postcode}
          />

          <FormField
            name="Ville"
            labels="city"
            placeholder={data && data.city}
          />
        </fieldset>

        <FormField
          name="Email de contact"
          labels="email"
          placeholder={data && data.company_mail}
        />

        <FormField
          name="Téléphone"
          labels="phone"
          placeholder={data && data.phone}
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

export default Company;
