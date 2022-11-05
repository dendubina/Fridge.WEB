import "./SignInForm.css";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function SignInForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

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
