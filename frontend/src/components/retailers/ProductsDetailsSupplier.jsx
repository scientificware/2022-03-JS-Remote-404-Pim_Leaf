import { FcPhone, FcInvite, FcGlobe } from "react-icons/fc";

function ProductsDetailsSupplier({
  company,
  description,
  phone,
  mail,
  address,
  postcode,
  city,
  website,
}) {
  return (
    <>
      {/* SUPPLIER */}
      <div className="my-4">
        <h2 className="text-3xl">Le Fabricant</h2>

        <article className="bg-middleBlue/50 font-redHat flex p-10 shadow-lg my-3">
          <header className="w-1/2">
            <h2 className="text-3xl mb-2">{company}</h2>

            <span>
              <p>{address}</p>
              <p>
                {postcode} - {city}
              </p>
            </span>

            <hr className="w-1/2" />

            <aside className="mt-6 grid grid-rows-3 gap-3">
              <a href={`tel:${phone}`} className="font-bold flex align-middle">
                <FcPhone className="mr-2 text-3xl" /> Téléphone : {phone}
              </a>

              <a href={`mailto:${mail}`} className="font-bold flex">
                <FcInvite className="mr-2 text-3xl" /> E-mail : {mail}
              </a>

              <a href={website} className="font-bold flex">
                <FcGlobe className="mr-2 text-3xl" /> Site web : {website}
              </a>
            </aside>
          </header>

          <div>
            <h3 className="text-2xl">Méthodes de fabrication</h3>
            <p>{description}</p>
          </div>
        </article>
      </div>
    </>
  );
}

export default ProductsDetailsSupplier;
