/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-unresolved */
import { useState, useEffect, useContext } from "react";
import { MdDone } from "react-icons/md";
import axios from "axios";

import { Typography, Box, Modal } from "@material-ui/core";

import UserExport from "@contexts/UserContext";

import ButtonPillMinus from "@components/common/ButtonPillMinus";
import ButtonPillPlus from "@components/common/ButtonPillPlus";
import SearchBarProducts from "@components/common/SearchBarProducts";
import ProductsLines from "@components/common/ProductsLines";

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

function Products() {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { user } = useContext(UserExport.UserContext);

  const handleCheckProducts = (prod) => {
    const newProduct = [...products];
    const index = newProduct.indexOf(prod);
    newProduct[index].check = !newProduct[index].check;
    setProducts(newProduct);
  };

  const handleClickMinus = (prod) => {
    const productToGet = [];
    const productToDelete = [];
    for (let i = 0; i < prod.length; i += 1) {
      prod[i].check
        ? productToDelete.push(prod[i])
        : productToGet.push(prod[i]);
    }
    setProducts(productToGet);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}user/${user.user_id}/products`)
      .then((res) => {
        const prod = res.data.map((el) => ({ ...el, check: false }));
        setProducts(prod);
      })
      .catch((error) => {
        console.warn(error.response.data);
      });
  }, []);

  return (
    <main>
      <h1 className="text-3xl text-center font-bold font-barlow mt-14 mb-8">
        Mes fiches produits
      </h1>

      {/* <ProductsTable /> */}
      <SearchBarProducts
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      <div className="font-redHat w-4/5 m-auto">
        <div className="flex flex-row justify-end">
          <ButtonPillPlus action={handleOpen} />
          <ButtonPillMinus action={handleClickMinus} target={products} />
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
}

export default Products;
