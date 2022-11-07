import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button, Table } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { GetServerErrors } from "../../services/GetServerErrors/GetServerErrors";
import {
  getAllProducts,
  createFridge,
} from "../../services/Http/FridgeApi/FridgeApiService";
import "./CreateFridgeForm.css";

export default function CreateFridgeForm() {
  const [serverErrors, setServerError] = useState([]);

  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { fields, append } = useFieldArray({
    control,
    name: "fridgeProducts",
  });

  const getProductsToAdd = (formData) => {
    let productsToAdd = [];

    formData.fridgeProducts.forEach((product) => {
      if (product.add) {
        productsToAdd.push({
          productId: product.id,
          quantity: product.defaultQuantity,
        });
      }
    });

    return productsToAdd;
  };

  const onSubmit = (formData) => {
    formData.fridgeProducts = getProductsToAdd(formData);

    console.log(formData);

    createFridge(formData)
    .then((response) => {
      if (response.status === 400) {
        setServerError(GetServerErrors(response.errors));
      } else{
        navigate('/fridges');
      }
    })
    .catch(error =>{
        console.error(error);
    });
  };

  useEffect(() => {
    getAllProducts().then((response) => {
      response.forEach((product) => {
        product.add = false;
        append(product, { shouldFocus: false });
      });
    });
  }, [append]);

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="text-center">
              <h3>Create Fridge</h3>
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
                <Form.Label>Fridge Name</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.name ? "is-invalid" : ""}
                  {...register("name", { required: true })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Owner Name</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.ownerName ? "is-invalid" : ""}
                  {...register("ownerName", { required: true })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Model Name</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.modelName ? "is-invalid" : ""}
                  {...register("modelName", { required: true })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Model Year</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.modelYear ? "is-invalid" : ""}
                  {...register("modelYear", {
                    required: true,
                    // min: 1900,
                    // pattern:
                    //   /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                  })}
                />
              </Form.Group>

              <div className="text-center">
                <Button type="submit" variant="primary" size="lg">
                  Create
                </Button>
              </div>
            </Form>

            {fields && fields.length > 0 ? (
              <>
                <div className="text-center add-products-block">
                  <h3>Add Products</h3>
                </div>
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th className="text-center">Add</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((product, index) => (
                      <tr key={product.id}>
                        <td>
                          <img
                            className="image-td"
                            src={product.imageSource}
                            alt=":("></img>
                        </td>
                        <td>{product.name}</td>
                        <td>
                          <Form.Control
                            type="text"
                            className={
                              errors.fridgeProducts &&
                              errors.fridgeProducts[index]
                                ? "is-invalid"
                                : ""
                            }
                            {...register(
                              `fridgeProducts.${index}.defaultQuantity`,
                              {
                                required: true,
                                min: 1,
                                pattern:
                                  /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                              }
                            )}
                          />
                        </td>
                        <td className="checkbox-td">
                          <Form.Group>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              {...register(`fridgeProducts.${index}.add`)}
                            />
                          </Form.Group>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
