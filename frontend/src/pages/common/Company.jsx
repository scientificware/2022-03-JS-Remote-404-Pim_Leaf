/* eslint-disable import/no-unresolved */
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { Typography, Box, Modal } from "@material-ui/core";

import ButtonBlue from "@components/common/ButtonBlue";

import FormField from "@components/common/FormField";

import UserExport from "@contexts/UserContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Company() {
  const { user } = useContext(UserExport.UserContext);

  const [data, setDatas] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}company/${user.user_id}`)
      .then((res) => {
        setDatas(res.data);
      });
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <main className="font-redHat flex flex-col w-4/5 m-auto">
      <h1 className="flex justify-center text-3xl font-bold font-barlow text-darkBlue mb-14 mt-14">
        Mon entreprise
      </h1>

      <form>
        <FormField
          name="Nom"
          labels="name"
          placeholder={data && data.company_name}
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

      <ButtonBlue action={handleOpen} text="Changez mes informations" />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </main>
  );
}

export default Company;
