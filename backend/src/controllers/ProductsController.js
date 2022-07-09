const models = require("../models");

class ProductsController {
  static browse = (req, res) => {
    models.products
      .getProducts(req.params.id)
      .then(([rows]) => {
        res.status(200).json(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    models.products
      .getProductDetails(req.params.id)
      .then(([data]) => {
        models.products
          .getProductAllergens(req.params.id)
          .then(([labelsArr]) => {
            models.products
              .getProductLabels(req.params.id)
              .then(([allergensArr]) => {
                if (data[0] === null) {
                  res.sendStatus(404);
                } else {
                  const datas = {
                    ...data,
                    allergens: allergensArr,
                    labels: labelsArr,
                  };
                  res.status(200).json(datas);
                }
              });
          });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = ProductsController;
