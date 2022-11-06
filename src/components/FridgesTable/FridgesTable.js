import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import GetAllFridges from "../../services/Http/GetAllFridges";
import "./FridgesTable.css";

export default function FridgesTable() {
  const [fridges, setFridges] = useState([]);

  useEffect(() => {
    GetAllFridges()
      .then((response) => {
        console.log(response);
        setFridges(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {fridges && fridges.length > 0 ? (
        <Table striped>
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
              <tr>
                <td>
                  <span key={index}>{item.id}</span>
                </td>
                <td>
                  <span key={index}>{item.name}</span>
                </td>
                <td>
                  <span key={index}>{item.ownerName}</span>
                </td>
                <td>
                  <span key={index}>{item.modelName}</span>
                </td>
                <td>
                  <span key={index}>{item.modelYear}</span>
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
