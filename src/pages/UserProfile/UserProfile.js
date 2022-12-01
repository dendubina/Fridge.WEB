import Header from "../../components/Header/Header";
import UpdateUserForm from "../../components/UpdateUserForm/UpdateUserForm";
import useAuth from "../../features/Hooks/useAuth";

export default function UserProfile() {
  const auth = useAuth();

  return (
    <>
      <Header />
      <UpdateUserForm userId={auth.userData.id} redirectUrl="/profile" />
    </>
  );
}
