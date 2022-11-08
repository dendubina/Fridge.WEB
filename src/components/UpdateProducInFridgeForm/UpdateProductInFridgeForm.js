import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./UpdateProductInFridgeForm.css";

export default function UpdateProductInFridgeForm(props) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <>     
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="text-center">
              <h3>Update Product in fridge</h3>              
            </div>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
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
