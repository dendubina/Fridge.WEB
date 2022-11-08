import { Container, ListGroup, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LinksBlock.css";

export default function LinksBlock() {
  return (
    <>
      <Container className="links-container">
        <Row className="justify-content-center">
          <Col md={6}>
            <ListGroup id="list-items">
              <ListGroup.Item className="text-center list-item">
                <Link
                  className="btn btn-outline-primary list-link"
                  to="/fridges">
                  Fridges
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className="text-center list-item">
                <Link
                  className="btn btn-outline-primary list-link"
                  to="/products">
                  Products
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}
