import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function FormFile() {
  const [points, setPoints] = useState({
    canvas: {},
    line: [],
    rectangle: [],
    bucketfill: {},
  });
  const [canvas, setCanvas] = useState([]);
  const [lines, setLines] = useState([]);
  const [rectangles, setRectangles] = useState([]);
  const [bucketfills, setBucketfills] = useState([]);
  const [cbUF, setCbUF] = useState(false);
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
  useEffect(() => {
    if (points.canvas) {
      newCanvas(points.canvas);
    }
  }, [points.bucketfill]);

  const newCanvas = ({ width, height }) => {
    if (width && height) {
      const borderH = "-".repeat(+width + 2);
      const borderV = [];
      for (let i = 1; i <= +height; i++) {
        borderV.push("\n|" + " ".repeat(+width) + "|");
      }
      const newArr = [borderH, ...borderV, `\n${borderH}`];
      setCanvas([newArr]);
    }
  };
  useEffect(() => {
    if (points.line) {
      newLine(points.line);
    }
  }, [canvas]);

  const newLine = (lines) => {
    if (canvas[0]) {
      const canvasCopy = canvas[0].slice();
      lines.forEach((line) => {
        canvasCopy.map((str, index) => {
          if (
            line.y1 <= index &&
            line.y2 >= index &&
            index < canvasCopy.length - 1
          ) {
            try {
              const oldLine = str;
              let newLine = oldLine.split("");
              for (let el = +line.x1 + 1; el <= +line.x2 + 1; el++) {
                if (newLine[el] === " ") {
                  newLine[el] = "x";
                } else if (newLine[el] === "x") {
                  newLine[el] = "x";
                }
              }
              newLine = newLine.join("");
              if (newLine !== oldLine) {
                canvasCopy.splice(index, 1, newLine);
              }
            } catch (e) {
              console.log("Invalid range");
            }
          }
        });
      });
      setLines([canvasCopy]);
    }
  };
  useEffect(() => {
    if (points.rectangle) {
      newRectangle(points.rectangle);
    }
  }, [lines]);
  const newRectangle = (rectangle) => {
    if (lines[0]) {
      const linesCopy = lines[0].slice();
      rectangle.forEach((line) => {
        linesCopy.map((str, index) => {
          const isVertical = +line.y1 <= index && +line.y2 >= index;
          const isHorizontal = line.y1 == index || line.y2 == index;
          if (isVertical) {
            try {
              const oldLine = str;
              let newLine = oldLine.split("");
              for (let el = +line.x1 + 1; el <= +line.x2 + 1; el++) {
                if (newLine[el] === " ") {
                  if (el == +line.x1 + 1 || el == +line.x2 + 1) {
                    newLine[el] = "x";
                  } else if (isHorizontal) {
                    newLine[el] = "x";
                  }
                } else if (newLine[el] === "x") {
                  newLine[el] = "x";
                }
              }
              newLine = newLine.join("");
              if (newLine !== oldLine) {
                linesCopy.splice(index, 1, newLine);
              }
            } catch (e) {
              console.log("Invalid range");
            }
          }
        });
      });
      setRectangles([linesCopy]);
    }
  };
  useEffect(() => {
    if (points.bucketfill) {
      newBucketfill(points.bucketfill);
    }
  }, [rectangles]);
  const newBucketfill = ({ x, y, color }) => {
    if (rectangles[0]) {
      const rectanglesCopy = rectangles[0].slice();
      const point = { x, y };
      const queue = [];
      queue.push(point);
      try {
        while (queue.length) {
          let { x, y } = queue.pop();
          rectanglesCopy.map((str, index) => {
            const oldLine = str;
            let newLine = oldLine.split("");
            for (let el = 1; el <= +newLine.length - 1; el++) {
              if (el == +x && index == +y) {
                if (
                  newLine[el] !== "x" &&
                  newLine[el] !== "|" &&
                  newLine[el] !== "-" &&
                  newLine[el] !== color
                ) {
                  newLine[el] = color;

                  queue.push({ x: +x + 1, y });
                  queue.push({ x: +x - 1, y });
                  queue.push({ x, y: +y - 1 });
                  queue.push({ x, y: +y + 1 });
                }
              }
            }
            newLine = newLine.join("");
            if (newLine !== oldLine) {
              rectanglesCopy.splice(index, 1, newLine);
            }
          });
        }
      } catch (e) {
        console.log("Invalid range");
      }
      setBucketfills([rectanglesCopy]);
    }
  };
  const text = bucketfills[0] ? <xmp>{bucketfills[0].join("")}</xmp> : "null";
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
          {text}
        </Col>
      </Row>
    </Form>
  );
  return body;
}

export default FormFile;
