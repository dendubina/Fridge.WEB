import Header from "../../components/Header/Header";
import useAuth from "../../features/Hooks/useAuth";
import "./HomePage.css";

export default function HomePage() {

  const auth = useAuth();

  return (
    <>
      <Header />
      <div>This is Home PAge</div>
      <div>Is authed: {auth.isAuthed.toString()}</div>
    </>
  );
}
