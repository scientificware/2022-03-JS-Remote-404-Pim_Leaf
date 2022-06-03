import { useParams } from "react-router-dom";
import dataSet from "../data/BenoitData";

function ProductDetails() {
  const { id } = useParams();

  return (
    <main>
      <h1>{dataSet[parseInt(id, 10)].name}</h1>
    </main>
  );
}

export default ProductDetails;
