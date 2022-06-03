import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="flex items-center justify-between pt-5">
      <img
        src="./src/assets/logo1.png"
        alt="logo"
        className="h-28 ml-9 mb-5 item-center"
      />
      <ul className="">
        <li className="md:inline-block  md:ml-10 ml-5 md:my-0 my-6 border-b-2 border-transparent hover:border-white duration-300">
          <Link
            to="/products"
            className="text-#14252F cursor-pointer font-Barlow font-normal text-sm inline-block md:py-5 py-3"
          >
            <span className="font-bold mr-1.5">01</span>
            MES PRODUITS
          </Link>
        </li>
        <li className="md:inline-block  md:ml-10 ml-5 md:my-0 my-6 border-b-2 border-transparent hover:border-white duration-300">
          <Link
            to="/suppliers"
            className="text-#14252F cursor-pointer font-Barlow font-normal text-sm inline-block md:py-5 py-3"
          >
            <span className="font-bold mr-1.5">02</span>
            MES FOURNISSEURS
          </Link>
        </li>
        <li className="md:inline-block  md:ml-10 ml-5 md:my-0 my-6 border-b-2 border-transparent hover:border-white duration-300">
          <Link
            to="/company"
            className="text-#14252F cursor-pointer font-Barlow font-normal text-sm inline-block md:py-5 py-3"
          >
            <span className="font-bold mr-1.5">03</span>
            MON ENTREPRISE
          </Link>
        </li>
        <li className="md:inline-block  md:ml-10 ml-5 md:my-0 my-6 border-b-2 border-transparent hover:border-white duration-300">
          <Link
            to="/profil"
            className="text-#14252F cursor-pointer font-Barlow font-normal text-sm inline-block md:py-5 py-3"
          >
            <span className="font-bold mr-1.5">04</span>
            MON PROFIL
          </Link>
        </li>
        <button
          type="button"
          className="md:inline-block  md:ml-10 ml-5 md:my-0 my-6 hover:border-white duration-300"
        >
          <img
            src="./src/assets/logout_icon.png"
            alt=""
            className="h-12 mr-14 inline-block py-3"
          />
        </button>
      </ul>
    </nav>
  );
}

export default Nav;
