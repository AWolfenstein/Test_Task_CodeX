import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function FormFile() {
  const [points, setPoints] = useState({
    canvas: {},
    line: [],
    rectangle: [],
    bucketfill: {},
  });

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      const newFile = reader.result.split("\n");
      newFile.forEach((el) => {
        const arr = el.split(" ");
        const positions = arr.splice(1);
        switch (arr[0]) {
          case "C":
            setPoints((points) => ({
              ...points,
              canvas: {
                width: positions[0],
                height: positions[1],
              },
            }));
            break;
          case "L":
            setPoints((points) => ({
              ...points,
              line: [
                ...points.line,
                {
                  x1: positions[0],
                  y1: positions[1],
                  x2: positions[2],
                  y2: positions[3],
                },
              ],
            }));
            break;
          case "R":
            setPoints((points) => ({
              ...points,
              rectangle: [
                ...points.rectangle,
                {
                  x1: positions[0],
                  y1: positions[1],
                  x2: positions[2],
                  y2: positions[3],
                },
              ],
            }));

            break;
          case "B":
            setPoints((points) => ({
              ...points,
              bucketfill: {
                x: positions[0],
                y: positions[1],
                color: positions[2],
              },
            }));
        }
      });
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  const body = (
    <Form>
      <Row>
        <Col>
          <Form.File
            id="file"
            label="file"
            custom
            feedbackTooltip
            onChange={uploadFile}
          />
        </Col>
        <Col>
          <Button type="submit">Download output</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {" "}
          <Form.Label>Preview</Form.Label>
          <Form.Control as="textarea" rows={6} />
        </Col>
      </Row>
    </Form>
  );
  return body;
}

export default FormFile;
