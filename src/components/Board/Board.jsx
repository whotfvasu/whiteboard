import React, { useEffect, useRef } from "react";
import rough from "roughjs";

const Board = () => {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const roughCanvas = rough.canvas(canvas);
    const generator = roughCanvas.generator;
    let rect1 = generator.rectangle(10, 10, 100, 100);
    let rect2 = generator.rectangle(10, 120, 100, 100, {
      roughness: 2,
      stroke: "green",
      fill: "green",
    });

    roughCanvas.draw(rect1);
    roughCanvas.draw(rect2);
  }, []);
  return (
    <div>
      <canvas ref={canvasRef} width="100vw" height="100vh" />
    </div>
  );
};

export default Board;
