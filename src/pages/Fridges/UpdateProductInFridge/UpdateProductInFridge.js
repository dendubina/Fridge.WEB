import { useParams } from "react-router-dom";
import Header from "../../../components/Header/Header";
import UpdateProductInFridgeForm from "../../../components/UpdateProducInFridgeForm/UpdateProductInFridgeForm";

export default function UpdateProductInFridge() {
  const params = useParams();

  return <>
    <Header />
    <UpdateProductInFridgeForm fridgeId={params.fridgeId} productId={params.productId} />
  </>;
}
