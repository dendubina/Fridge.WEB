import Header from "../../components/Header/Header";
import SignInForm from "../../components/SignInForm/SignInForm";
import useAuth from "../../features/Hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function SignIn() {
  const auth = useAuth();

  return auth.isAuthed ? (
    <Navigate replace to="/" />
  ) : (
    <>
      <Header />
      <SignInForm />
    </>
  );
}
