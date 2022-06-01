import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="flex px-4 justify-between items-center w-full pt-5">
      <Link to="/" className="nav_logo_mt">
        <img
          className="object-logo h-28 ml-9 mb-5 "
          src="./src/assets/logo1.png"
          alt="logo"
        />
      </Link>
      <ul
        className="flex item-center
                  py-5
                  px-6"
      >
        <li className="self-center p-7">
          <Link to="/products" className="text-#14252F ">
            Mes Produits
          </Link>
        </li>
        <li className="self-center p-7">
          <Link to="/supliers" className="text-#14252F ">
            Mes Fourniseurs
          </Link>
        </li>
        <li className="self-center p-7">
          <Link to="/company" className="text-#14252F ">
            Mon Entreprise
          </Link>
        </li>
        <li className="self-center p-7">
          <Link to="/profil" className="text-#14252F ">
            Mon Profil
          </Link>
        </li>
      </ul>
      <button
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mr-7"
      >
        Deconnexion
      </button>
    </nav>
  );
}

export default Nav;
