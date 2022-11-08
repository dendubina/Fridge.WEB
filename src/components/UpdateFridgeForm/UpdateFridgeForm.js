import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { GetServerErrors } from "../../services/GetServerErrors/GetServerErrors";
import {
  getFridgeById,
  updateFridge,
  deleteProductFromFridge,
} from "../../services/Http/FridgeApi/FridgeApiService";
import "./UpdateFridgeForm.css";

export default function UpdateFridgeForm(props) {
  const navigate = useNavigate();
  const [fridge, setFridge] = useState();
  const [serverErrors, setServerErrors] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    formData.id = fridge.id;

    updateFridge(formData).then((response) => {
      if (response && response.status === 400) {
        setServerErrors(GetServerErrors(response.errors));
      } else {
        navigate("/fridges");
      }
    });
  };

  const handleEdit = (event) => {
    console.log(event.target.name);
  };

  const handleDelete = (event) => {
    let productId = event.target.name;
    
    deleteProductFromFridge(fridge.id, productId).then((response) => {
      setFridge((prevFridge) => {
        const newFridge = { ...prevFridge };

        newFridge.fridgeProducts = prevFridge.fridgeProducts.filter(
          (product) => product.productId !== productId
        );

        return newFridge;
      });
    });
  };

  useEffect(() => {
    getFridgeById(props.fridgeId)
      .then((response) => {
        setFridge(response);
      })
      .catch((error) => console.error(error));
  }, [props.fridgeId]);

  return (
    <>
      {fridge ? (
        <>
          <Container>
            <Row className="justify-content-center">
              <Col md={6}>
                <div className="text-center">
                  <h3>Update Fridge</h3>
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
                      defaultValue={fridge.name}
                      className={errors.name ? "is-invalid" : ""}
                      {...register("name", { required: true })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Owner Name</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={fridge.ownerName}
                      className={errors.ownerName ? "is-invalid" : ""}
                      {...register("ownerName", { required: true })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Model Name</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={fridge.modelName}
                      className={errors.modelName ? "is-invalid" : ""}
                      {...register("modelName", { required: true })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Model Year</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={fridge.modelYear}
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
                      Save
                    </Button>
                  </div>
                </Form>

                {fridge &&
                fridge.fridgeProducts &&
                fridge.fridgeProducts.length > 0 ? (
                  <>
                    <Table striped responsive className="fridge-products-table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Quantity</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fridge.fridgeProducts.map((product, index) => (
                          <tr key={product.id}>
                            <td>
                              <img
                                className="image-td"
                                src={product.imageSource}
                                alt=":("></img>
                            </td>
                            <td>{product.productName}</td>
                            <td>{product.quantity}</td>
                            <td className="text-center">
                              <Button
                                variant="warning"
                                size="sm"
                                className="action-button"
                                name={product.productId}
                                onClick={handleEdit}>
                                Edit
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                className="action-button"
                                name={product.productId}
                                onClick={handleDelete}>
                                Delete
                              </Button>
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
      ) : (
        <></>
      )}
    </>
  );
}
