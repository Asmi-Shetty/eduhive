import React, { useRef, useState, useEffect } from "react";

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#ffffff"); // Default white brush for black canvas
  const [brushSize, setBrushSize] = useState(5);
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.lineJoin = "round";

    // Fill background black once (does not reset on color change)
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    contextRef.current = context;
  }, []); // ✅ Run only once to set up canvas

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;

    contextRef.current.strokeStyle = isEraser ? "#000000" : color; // ✅ Dynamic brush color
    contextRef.current.lineWidth = brushSize;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#000000"; // ✅ Clears while keeping black background
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="h-screen w-screen flex flex-col fixed top-0 left-0">
      {/* Toolbar Section */}
      <div className="flex items-center bg-gray-800 p-4">
        <button
          onClick={clearCanvas}
          className="p-2 bg-red-700 text-white rounded-sm mr-3"
        >
          Clear
        </button>

        <button
          onClick={() => setIsEraser(!isEraser)}
          className={`p-2 rounded-sm mr-3 ${
            isEraser ? "bg-yellow-500 text-black" : "bg-white text-black"
          }`}
        >
          {isEraser ? "Eraser Mode" : "Brush Mode"}
        </button>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          disabled={isEraser} // ✅ Disable color picker in eraser mode
          className="mr-3"
        />

        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(e.target.value)}
        />
      </div>

      {/* Canvas Section */}
      <div className="flex-1 border-white-2 bg-black">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-full cursor-crosshair"
        />
      </div>
    </div>
  );
};

export default Whiteboard;
    