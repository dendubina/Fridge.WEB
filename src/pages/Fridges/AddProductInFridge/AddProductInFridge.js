import { useParams } from "react-router-dom";
import Header from "../../../components/Header/Header";
import AddProductInFridgeForm from "../../../components/AddProductInFridgeForm/AddProductInFridgeForm";

export default function AddProductInFridge() {
  const params = useParams();

  return (
    <>
      <Header />
      <AddProductInFridgeForm fridgeId={params.fridgeId} />
    </>
  );
}
