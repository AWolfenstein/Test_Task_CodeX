import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  newCanvas,
  newLine,
  newRectangle,
  newBucketfill,
} from "../js/paintLogic";
import { parse } from "../js/parseFile";

function FormFile() {
  const [points, setPoints] = useState({
    canvas: {},
    line: [],
    rectangle: [],
    bucketfill: {},
  });
  const [fileName, setFileName] = useState("");
  const [canvas, setCanvas] = useState([]);
  const [lines, setLines] = useState([]);
  const [rectangles, setRectangles] = useState([]);
  const [bucketfills, setBucketfills] = useState([]);
  const [result, setResult] = useState([]);
  const uploadFile = (e) => {
    setResult([]);
    setPoints((points) => ({
      ...points,
      canvas: {},
      line: [],
      rectangle: [],
      bucketfill: {},
    }));
    setFileName(e.target.files[0].name);
    const file = e.target.files[0];
    parse(file, setPoints);
    e.target.value = "";
  };

  useEffect(() => {
    if (points.canvas) {
      newCanvas(points.canvas, setCanvas);
    }
  }, [points.bucketfill]);

  useEffect(() => {
    if (points.line) {
      newLine(points.line, canvas, setLines);
    }
  }, [canvas]);

  useEffect(() => {
    if (points.rectangle) {
      newRectangle(points.rectangle, lines, setRectangles);
    }
  }, [lines]);

  useEffect(() => {
    if (points.bucketfill) {
      newBucketfill(points.bucketfill, rectangles, setBucketfills);
    }
  }, [rectangles]);

  useEffect(() => {
    if (canvas[0]) {
      setResult(
        `${canvas[0].join("")}\n${lines[0].join("")}\n${rectangles[0].join(
          ""
        )}\n${bucketfills[0].join("")}`
      );
    }
  }, [bucketfills]);

  const downloadTxtFile = () => {
    if (result.length) {
      const element = document.createElement("a");
      const file = new Blob([result], { type: "text/plain;charset=utf-8" });
      element.href = URL.createObjectURL(file);
      element.download = "output.txt";
      document.body.appendChild(element);
      element.click();
    } else {
      alert("No data to download!");
    }
  };
  const text = result.length ? (
    <xmp>{result}</xmp>
  ) : (
    <xmp>No data avalibale</xmp>
  );
  const body = (
    <Form>
      <Row>
        <Col md="auto">
          <Form.File
            id="file"
            label={fileName ? fileName : "Choose file"}
            custom
            accept="text/plain"
            feedbackTooltip
            onChange={uploadFile}
          />
        </Col>
        <Col md="auto">
          <Button onClick={downloadTxtFile}>Download output</Button>
        </Col>
      </Row>
      <Row>
        <Col className="colForm" id="preview">
          {text}
        </Col>
      </Row>
    </Form>
  );
  return body;
}

export default FormFile;
