export const newCanvas = ({ width, height }, setCanvas) => {
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

export const newLine = (lines, canvas, setLines) => {
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

export const newRectangle = (rectangle, lines, setRectangles) => {
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

export const newBucketfill = ({ x, y, color }, rectangles, setBucketfills) => {
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
