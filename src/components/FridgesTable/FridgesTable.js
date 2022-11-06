import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { GetAllFridges } from "../../services/Http/FridgeApi/FridgeApiService";
import "./FridgesTable.css";

export default function FridgesTable() {
  const [fridges, setFridges] = useState([]);

  useEffect(() => {
    GetAllFridges()
      .then((response) => {
        setFridges(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {fridges && fridges.length > 0 ? (        
          <Table striped responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Owner Name</th>
                <th>Model</th>
                <th>Model Year</th>
                <th>Actions</th>
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
                  <td>
                    <span>actions</span>
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
