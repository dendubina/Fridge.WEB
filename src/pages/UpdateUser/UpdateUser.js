import { useParams } from "react-router-dom";
import UpdateUserForm from "../../components/UpdateUserForm/UpdateUserForm";
import Header from "../../components/Header/Header";

export default function UpdateUser() {
    const params = useParams();

    return <>
        <Header />
        <UpdateUserForm userId = {params.userId}/>
    </>
}
