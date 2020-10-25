export const parse = (file, setPoints) => {
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
  reader.loadend  = function () {
    reader.abort()
  };

};
