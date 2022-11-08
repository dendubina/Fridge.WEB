import { useEffect, useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  addProductInFridge,
  getAllProducts,
} from "../../services/Http/FridgeApi/FridgeApiService";
import "./AddProductInFridgeForm.css";

export default function AddProductInFridgeForm(props) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((response) => {
      setProducts(response);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    addProductInFridge(props.fridgeId, {
      productId: formData.product,
      quantity: formData.quantity,
    }).then(navigate(`/fridges/update/${props.fridgeId}`, { replace: true }));
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="text-center">
              <h3>Add product in fridge</h3>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Form.Group className="mb-3">
                <Form.Label>Select product</Form.Label>
                <select
                  className={
                    "form-control " + (errors.product ? "is-invalid" : "")
                  }
                  {...register("product", { required: true })}>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.quantity ? "is-invalid" : ""}
                  {...register("quantity", { required: true, min: 1 })}
                />
              </Form.Group>

              <div className="text-center">
                <Button type="submit" variant="primary" size="lg">
                  Save
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
