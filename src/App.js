import logo from "./logo.svg";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";

import FormFile from "./components/Form";
function App() {
  return (
    <Container fluid="md">

      <Row>
        <Col className="colForm">
          <FormFile />
        </Col>
      </Row>
    
    </Container>
  );
}

export default App;
