import { useEffect, useState } from "react";
import {
  getUserById,
  updateUser,
} from "../../services/Http/FridgeApi/FridgeApiService";
import { Form, Container, Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./UpdateUserForm.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../features/Hooks/useAuth";
import { GetServerErrors } from "../../services/GetServerErrors/GetServerErrors";

export default function UpdateUserForm(props) {
  const [user, setUser] = useState(null);
  const [serverErrors, setServerErrors] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    getUserById(props.userId)
      .then((response) => response.json())
      .then((user) => setUser(user));
  }, [props.userId]);

  const handleError = () => {
    auth.logOut();
    navigate("/signIn");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    const data = {
      id: user.id,
      userName: formData.userName,
      email: formData.email,
    };

    updateUser(data)
      .then((response) => {
        if (response.ok) {
          navigate("/users");
        }

        switch (response.status) {
          case 401:
            handleError();
            break;
          case 400:
            return response.json();
          default:
            setServerErrors(["Something went wrong"]);
        }
      })
      .then((result) => {
        if (result.status === 400) {
          setServerErrors(GetServerErrors(result.errors));
        }
      });
  };

  return (
    <>
      {user && (
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <div className="text-center">
                <h3>Update User</h3>
              </div>
              <div className="text-center">
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
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    defaultValue={user.userName}
                    type="text"
                    className={errors.userName ? "is-invalid" : ""}
                    {...register("userName", { required: true, min: 1 })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={user.email}
                    className={errors.email ? "is-invalid" : ""}
                    {...register("email", {
                      required: true,
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Not valid email",
                      },
                    })}
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
      )}
    </>
  );
}
