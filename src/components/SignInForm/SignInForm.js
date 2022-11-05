import "./SignInForm.css";
import { Button, Form } from "react-bootstrap";

export default function SignInForm() {
  return (
    <div className="text-center">
      <Form className="form-signin">
        <h1 class="h3 mb-3 font-weight-normal">Please Sign In</h1>

        <img
          class="mb-4"
          src="https://s3-assets.quenchessentials.com/media/images/products/frigidaire-fftr1821ts-18-cu-ft-top-freezer-refrigerator-stainless-steel-main.png"
          alt=""
          width="72"
          height="72"></img>

        <Form.Control type="text" placeholder="Email" />

        <Form.Control type="password" placeholder="Password" />

        <Button as="submit" variant="primary" size="lg">
          Sign In
        </Button>
      </Form>
    </div>
  );
}
