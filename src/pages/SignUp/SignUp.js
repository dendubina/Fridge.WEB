import { Fragment } from "react";
import Header from "../../components/Header/Header";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import "./SignUp.css";

export default function SignUp() {
  return (
    <Fragment>
      <Header />
      <SignUpForm />
    </Fragment>
  );
}
