import "./FridgesList.css";
import Header from "../../../components/Header/Header";
import FridgesTable from "../../../components/FridgesTable/FridgesTable";
import { Link } from "react-router-dom";

export default function FridgesList() {
  return (
    <>
      <Header />      
      <FridgesTable />
    </>
  );
}
