import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LinksBlock.css";

export default function LinksBlock() {
  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          <Link to="/fridges">Fridges</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/products">Products</Link>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}
