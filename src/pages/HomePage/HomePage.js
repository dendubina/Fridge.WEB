import Header from "../../components/Header/Header";
import LinksBlock from "../../components/LinksBlock/LinksBlock";
import useAuth from "../../features/Hooks/useAuth";
import "./HomePage.css";

export default function HomePage() {
  const auth = useAuth();

  return (
    <>
      <Header />
      <LinksBlock />
      <div>This is Home PAge</div>
      <div>
        Is authed: {auth.isAuthed.toString()} <br />
        {auth.userData ? <div>{auth.userData.jwtToken}</div> : <div></div>}
      </div>
    </>
  );
}
