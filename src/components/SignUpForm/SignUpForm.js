import "./SignUpForm.css";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function SignUpForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="text-center">
      <Form
        className="form-signin"
        onSubmit={handleSubmit(onSubmit)}
        noValidate>
        <h1 className="h3 mb-3 font-weight-normal">Please Sign Up</h1>

        <img
          className="mb-4"
          src="https://s3-assets.quenchessentials.com/media/images/products/frigidaire-fftr1821ts-18-cu-ft-top-freezer-refrigerator-stainless-steel-main.png"
          alt=""
          width="72"
          height="72"></img>

        <Form.Control
          type="text"
          className={errors.userName ? "is-invalid" : ""}
          placeholder="User name"
          {...register("userName", { required: true })}
        />

        <Form.Control
          type="email"
          className={errors.email ? "is-invalid" : ""}
          placeholder="Email"
          id="signUpEmailInput"
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
          id="signUpPasswordInput"
          {...register("password", { required: true })}
        />

        <Form.Control
          type="password"
          className={errors.passwordConfirm ? "is-invalid" : ""}
          placeholder="Password confirm"
          {...register("passwordConfirm", {
            required: true,            
            validate: {
              matchesPreviousPassword: (value) => {
                const { password } = getValues();
                return password === value || "Password doesn't match";
              },
            },
          })}
        />

        <Button type="submit" variant="primary" size="lg">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}
