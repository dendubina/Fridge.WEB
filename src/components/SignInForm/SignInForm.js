import "./SignInForm.css";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetServerErrors } from "../../services/GetServerErrors/GetServerErrors";
import { signIn } from "../../services/Http/FridgeApi/FridgeApiService";
import useAuth from "../../features/Hooks/useAuth";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../services/AuthConfig";

export default function SignInForm() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [serverErrors, setServerError] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const auth = useAuth();
  const { instance } = useMsal();

  const onSubmit = (formData) => {
    setIsLoaded(false);
    signIn(formData)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 400) {
          setServerError(GetServerErrors(result.errors));
        } else {
          auth.logIn(result);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
        setServerError(["Something went wrong, try later"]);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  };

  const handleMicrosoftLogin = () =>
    instance.loginRedirect(loginRequest).catch((e) => console.error(e));

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
          className={errors.email ? "is-invalid" : ""}
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Not valid email",
            },
          })}
        />

        <Form.Control
          type="password"
          className={errors.password ? "is-invalid" : ""}
          placeholder="Password"
          {...register("password", { required: true })}
        />

        <Button type="submit" variant="primary" size="lg">
          Sign In{" "}
          {!isLoaded && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
        </Button>
      </Form>

      <div className="azure-ad-button-block">
        <Button
          type="submit"
          variant="outline-primary"
          size="lg"
          onClick={handleMicrosoftLogin}>
          Sign in with Microsoft
        </Button>
      </div>
    </div>
  );
}
