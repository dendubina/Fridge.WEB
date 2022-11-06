import "./SignInForm.css";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetServerErrors } from "../../services/GetServerErrors/GetServerErrors";
import SignIn from "../../services/Http/SignIn";
import useAuth from "../../features/Hooks/useAuth";

export default function SignInForm() {
  const [serverErrors, setServerError] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const auth = useAuth();

  const onSubmit = (data) => {
    SignIn(data).then((response) => {
      if (response.status === 400) {
        setServerError(GetServerErrors(response.errors));
      } else {
        auth.logIn(response);
        navigate("/");
      }
    });
  };

  return (
    <div className="text-center">
      <Form
        className="form-signin"
        onSubmit={handleSubmit(onSubmit)}
        noValidate>
        <h1 className="h3 mb-3 font-weight-normal">Please Sign In</h1>

        <img
          className="mb-4"
          src="https://s3-assets.quenchessentials.com/media/images/products/frigidaire-fftr1821ts-18-cu-ft-top-freezer-refrigerator-stainless-steel-main.png"
          alt=""
          width="72"
          height="72"></img>
        <br />

        {serverErrors &&
          serverErrors.length > 0 &&
          serverErrors.map((item, index) => (
            <span className="error-message" key={index}>
              {item}
              <br />
            </span>
          ))}

        <Form.Control
          type="text"
          className={errors.userName ? "is-invalid" : ""}
          placeholder="User name"
          {...register("userName", { required: true })}
        />

        <Form.Control
          type="password"
          className={errors.password ? "is-invalid" : ""}
          placeholder="Password"
          {...register("password", { required: true })}
        />

        <Button type="submit" variant="primary" size="lg">
          Sign In
        </Button>
      </Form>
    </div>
  );
}
