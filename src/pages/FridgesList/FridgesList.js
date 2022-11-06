import "./FridgesList.css";
import Header from "../../components/Header/Header";
import FridgesTable from "../../components/FridgesTable/FridgesTable";
import { Link } from "react-router-dom";

export default function FridgesList() {
  return (
    <>
      <Header />
      <div className="text-center">
        <Link to="/fridges/create" className="btn btn-primary create-button">
          Create
        </Link>
      </div>
      <FridgesTable />
    </>
  );
}
