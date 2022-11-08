import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import {
  deleteFridge,
  getAllFridges,
} from "../../services/Http/FridgeApi/FridgeApiService";
import "./FridgesTable.css";

export default function FridgesTable() {
  const navigate = useNavigate();
  const [fridges, setFridges] = useState([]);

  useEffect(() => {
    getAllFridges()
      .then((response) => {
        setFridges(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (event) => {
    deleteFridge(event.target.name).then(
      setFridges(fridges.filter((fridge) => fridge.id !== event.target.name))
    );
  };

  const handleEdit = (event) =>
    navigate(`/fridges/update/${event.target.name}`);

  return (
    <>
      <div className="text-center">
        <Link to="/fridges/create" className="btn btn-primary create-button">
          Create
        </Link>
      </div>
      {fridges && fridges.length > 0 ? (
        <Table striped responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Owner Name</th>
              <th>Model</th>
              <th>Model Year</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fridges.map((item, index) => (
              <tr key={index}>
                <td>
                  <span>{item.id}</span>
                </td>
                <td>
                  <span>{item.name}</span>
                </td>
                <td>
                  <span>{item.ownerName}</span>
                </td>
                <td>
                  <span>{item.modelName}</span>
                </td>
                <td>
                  <span>{item.modelYear}</span>
                </td>
                <td className="text-center">
                  <Button
                    variant="warning"
                    size="sm"
                    className="action-button"
                    name={item.id}
                    onClick={handleEdit}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="action-button"
                    name={item.id}
                    onClick={handleDelete}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <></>
      )}
    </>
  );
}
