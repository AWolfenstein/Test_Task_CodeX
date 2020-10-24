import logo from "./logo.svg";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";

import FormFile from "./components/Form";
function App() {
  return (
    <Container>

      <Row>
        <Col>
          <FormFile />
        </Col>
      </Row>
    
    </Container>
  );
}

export default App;
