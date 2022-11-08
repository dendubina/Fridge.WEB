import { useEffect, useState } from "react";
import {
  getAllProducts,
  deleteProduct,
} from "../../services/Http/FridgeApi/FridgeApiService";
import { Table, Button } from "react-bootstrap";
import useAuth from "../../features/Hooks/useAuth";
import "./ProductsTable.css";
import { useNavigate } from "react-router-dom";

export default function ProductsTable() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    getAllProducts().then((response) => {
      setProducts(response);
    });
  }, []);

  const handleEdit = (event) => navigate(`/products/edit/${event.target.name}`);

  const handleDelete = (event) => {
    deleteProduct(event.target.name).then(
      setProducts(
        products.filter((product) => product.id !== event.target.name)
      )
    );
  };

  const handleAdd = () => navigate("/products/create");

  return (
    <>
      {products && products.length > 0 ? (
        <Table striped responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Id</th>
              <th>Name</th>
              <th>Default quantity</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    className="image-td"
                    src={product.imageSource}
                    alt=":("></img>
                </td>
                <td>
                  <span>{product.id}</span>
                </td>
                <td>
                  <span>{product.name}</span>
                </td>
                <td>
                  <span>{product.defaultQuantity}</span>
                </td>
                <td className="text-center">
                  <Button
                    variant="warning"
                    size="sm"
                    className="action-button"
                    name={product.id}
                    onClick={handleEdit}>
                    Edit
                  </Button>
                  {auth.isAuthed && (
                    <Button
                      variant="danger"
                      size="sm"
                      className="action-button"
                      name={product.id}
                      onClick={handleDelete}>
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <></>
      )}
      <div className="text-center">
        <Button
          className="add-product-button"
          type="submit"
          variant="primary"
          size="lg"
          onClick={handleAdd}>
          Add Product
        </Button>
      </div>
    </>
  );
}
