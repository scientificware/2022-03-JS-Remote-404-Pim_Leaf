function ProductsDetailsRetailer({ tips, recipeIdea }) {
  return (
    <>
      {/* COMPANY */}
      <div className="my-4">
        <h2 className="text-3xl">Mon commerce</h2>

        <article className="bg-middleBlue/50 font-redHat flex p-10 shadow-lg my-3">
          <div className="mb-10 w-1/2">
            <h3 className="text-2xl pb-2">Astuces</h3>
            <p>{tips}</p>
          </div>

          <div className="mb-10">
            <h3 className="text-2xl pb-2">Idées recettes</h3>
            <p>{recipeIdea}</p>
          </div>
        </article>
      </div>
    </>
  );
}

export default ProductsDetailsRetailer;
