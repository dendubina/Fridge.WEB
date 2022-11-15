import { useParams } from "react-router-dom";
import EditProductForm from "../../../components/EditProductForm/EditProductForm";
import Header from "../../../components/Header/Header";

export default function EditProduct() {
  const params = useParams();

  return (
    <>
      <Header />
      <EditProductForm productId={params.productId} />
    </>
  );
}
