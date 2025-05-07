
import React, { useRef, useState, useEffect } from 'react';

interface CanvasEditorProps {
  width?: number;
  height?: number;
  onDraw?: (imageData: string) => void;
}

const CanvasEditor: React.FC<CanvasEditorProps> = ({ 
  width = 400, 
  height = 300,
  onDraw 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
        setContext(ctx);
      }
    }
  }, [canvasRef, color, brushSize]);
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (context) {
      setDrawing(true);
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        context.beginPath();
        context.moveTo(x, y);
      }
    }
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !context) return;
    
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      context.lineTo(x, y);
      context.stroke();
    }
  };
  
  const stopDrawing = () => {
    if (drawing && context) {
      context.closePath();
      setDrawing(false);
      
      // Save the drawing
      const canvas = canvasRef.current;
      if (canvas && onDraw) {
        onDraw(canvas.toDataURL());
      }
    }
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="border rounded p-2">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="border border-gray-200 cursor-crosshair bg-white"
      />
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8"
          />
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-xs">{brushSize}px</span>
        </div>
        <button
          onClick={clearCanvas}
          className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default CanvasEditor;
