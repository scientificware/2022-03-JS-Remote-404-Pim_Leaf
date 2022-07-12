/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-else-return */
/* eslint-disable import/no-unresolved */

import { useParams } from "react-router-dom";

import SearchBar from "@components/common/SearchBar";
import ProductsDetailsSupplier from "@components/retailers/ProductsDetailsSupplier";
import SuppliersDetailsDescription from "@components/retailers/SuppliersDetailsDescription";
import ProductsLines from "@components/common/ProductsLines";
import { MdDone } from "react-icons/md";
import ButtonPillPlus from "@components/common/ButtonPillPlus";

import axios from "axios";
import { useState, useContext, useEffect } from "react";

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

function SuppliersDetails() {
  const { id } = useParams();
  const { user } = useContext(UserExport.UserContext);
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);
  const [supplier, setSupplier] = useState();

  const handleCheckProducts = (prod) => {
    const newProduct = [...products];
    const index = newProduct.indexOf(prod);
    newProduct[index].check = !newProduct[index].check;
    setProducts(newProduct);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/company/${id}`)
      .then((res) => setSupplier(res.data));

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}user/${id}/products`)
      .then((res) => {
        const prod = res.data.map((el) => ({ ...el, check: false }));
        setProducts(prod);
      })
      .catch((error) => {
        console.warn(error.response.data);
      });
  }, []);

  console.warn(user);

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

          <div className="flex flex-row justify-end">
            <ButtonPillPlus action={handleOpen} />
          </div>

          <table className="w-full">
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
  } else {
    return null;
  }
}

export default SuppliersDetails;
