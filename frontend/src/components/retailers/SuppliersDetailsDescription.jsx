function SuppliersDetailsDescription({ supplier }) {
  return (
    <div className="mt-2">
      <h2 className="text-2xl">Description</h2>

      <article className="bg-middleBlue/50 font-redHat flex flex-col justify-between p-10 shadow-lg mt-2">
        <div className="mt-4 mb-10">
          <h3 className="text-2xl">Valeurs et engagements</h3>
          <p>{supplier && supplier.description}</p>
        </div>

        <div className="mt-4 mb-10">
          <h3 className="text-2xl">Certifications</h3>
          <p>{supplier && supplier.description}</p>
        </div>
      </article>
    </div>
  );
}

export default SuppliersDetailsDescription;
