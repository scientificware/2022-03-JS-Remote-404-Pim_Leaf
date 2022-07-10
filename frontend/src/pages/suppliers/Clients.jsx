/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-unresolved */

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SearchBar from "@components/common/SearchBarProducts";
import ClientsLines from "@components/suppliers/ClientsLines";
import ClientsLinesToAnswer from "@components/suppliers/ClientsLinesToAnswer";

import { Typography, Box, Modal } from "@material-ui/core";

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

function Clients() {
  const { user } = useContext(UserExport.UserContext);

  const [searchInput, setSearchInput] = useState("");

  const [connected, setConnected] = useState([]);
  const [pending, setPending] = useState([]);
  const [answer, setAnswer] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}supplier/${
          user.user_id
        }/clients/connected`
      )
      .then((res) => {
        setConnected(res.data);
      })
      .catch((error) => {
        console.warn(error.response.data);
      });

    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}supplier/${
          user.user_id
        }/clients/pending`
      )
      .then((res) => {
        setPending(res.data);
      })
      .catch((error) => {
        console.warn(error.response.data);
      });
  }, []);

  return (
    <main>
      <h1 className="text-3xl text-center font-bold font-barlow mt-14 mb-8">
        Mes Clients
      </h1>

      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />

      <div className="font-redHat w-4/5 m-auto">
        <h2 className="text-2xl font-redHat mb-4">
          En attente de confirmation
        </h2>
        <table className="w-full shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="text-left h-12 shadow-md">
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-middleBlue/100 bg-middleBlue/60 text-left text-xs font-semibold text-darkBlue uppercase tracking-wider w-3/12"
              >
                Nom
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-middleBlue/100 bg-middleBlue/60 text-left text-xs font-semibold text-darkBlue uppercase tracking-wider w-3/12"
              >
                Domaine
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-middleBlue/100 bg-middleBlue/60 text-left text-xs font-semibold text-darkBlue uppercase tracking-wider w-2/12"
              >
                Ville
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-middleBlue/100 bg-middleBlue/60 text-left text-xs font-semibold text-darkBlue uppercase tracking-wider w-3/12"
              >
                Réponse
              </th>
              <th className="font-redHat px-5 py-3 border-b-2 border-gray-200 bg-gray-100 border-middleBlue/100 bg-middleBlue/60 w-1/12" />
            </tr>
          </thead>
          <tbody>
            {pending
              .filter(
                (pend) =>
                  pend.company_name.includes(searchInput) ||
                  pend.city.includes(searchInput) ||
                  pend.status.includes(searchInput)
              )
              .map((pend) => (
                <ClientsLinesToAnswer
                  key={pend.supplier_id}
                  human={pend}
                  action={handleOpen}
                />
              ))}
          </tbody>
        </table>

        <h2 className="text-2xl font-redHat mt-10  mb-4">Connectés</h2>
        <table className="w-full shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="text-left h-12 shadow-md">
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-middleBlue/100 bg-middleBlue/60 text-left text-xs font-semibold text-darkBlue uppercase tracking-wider w-3/12"
              >
                Nom
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-middleBlue/100 bg-middleBlue/60 text-left text-xs font-semibold text-darkBlue uppercase tracking-wider w-3/12"
              >
                Domaine
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-middleBlue/100 bg-middleBlue/60 text-left text-xs font-semibold text-darkBlue uppercase tracking-wider w-2/12"
              >
                Ville
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-middleBlue/100 bg-middleBlue/60 text-left text-xs font-semibold text-darkBlue uppercase tracking-wider w-3/12"
              >
                Statut
              </th>
              <th className="font-redHat px-5 py-3 border-b-2 border-gray-200 bg-gray-100 border-middleBlue/100 bg-middleBlue/60 w-1/12" />
            </tr>
          </thead>
          <tbody>
            {connected
              .filter(
                (connect) =>
                  connect.company_name.includes(searchInput) ||
                  connect.city.includes(searchInput) ||
                  connect.status.includes(searchInput)
              )
              .map((connect) => (
                <ClientsLines key={connect.supplier_id} human={connect} />
              ))}
          </tbody>
        </table>
      </div>

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
            {answer}
          </Typography>
        </Box>
      </Modal>
    </main>
  );
}

export default Clients;
