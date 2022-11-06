import { useParams } from "react-router-dom";
import Header from "../../../components/Header/Header";
import UpdateFridgeForm from "../../../components/UpdateFridgeForm/UpdateFridgeForm";
import "./UpdateFridge.css";

export default function UpdateFridge(){

    const params = useParams();

    return (
        <>
            <Header />
            <UpdateFridgeForm fridgeId={params.fridgeId} />
        </>
    )
}