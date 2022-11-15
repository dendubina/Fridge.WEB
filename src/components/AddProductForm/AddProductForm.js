import "./AddProductForm.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GetServerErrors } from "../../services/GetServerErrors/GetServerErrors";
import { createProduct } from "../../services/Http/FridgeApi/FridgeApiService";

export default function AddProductForm() {
  const navigate = useNavigate();

  const [serverErrors, setServerError] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append("Image", data.image[0]);

    createProduct(formData)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 400) {
          setServerError(GetServerErrors(result.errors));
        } else {
          navigate("/products");
        }
      });
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="text-center">
              <h3>Create Product</h3>
              {serverErrors &&
                serverErrors.length > 0 &&
                serverErrors.map((item, index) => (
                  <span className="error-message" key={index}>
                    {item}
                    <br />
                  </span>
                ))}
            </div>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  className={errors.image ? "is-invalid" : ""}
                  {...register("image")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.name ? "is-invalid" : ""}
                  {...register("name", { required: true })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Default Quantity</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.defaultQuantity ? "is-invalid" : ""}
                  {...register("defaultQuantity", { required: true, min: 1 })}
                />
              </Form.Group>

              <div className="text-center">
                <Button type="submit" variant="primary" size="lg">
                  Create
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
