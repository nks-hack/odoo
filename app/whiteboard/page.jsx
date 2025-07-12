"use client"

import { useState, useEffect, useRef } from "react"
import { Pen, Eraser, Square, Circle, Type, Download, Trash2, Undo, Redo } from "lucide-react"

export default function WhiteboardPage() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState("pen")
  const [color, setColor] = useState("#000000")
  const [lineWidth, setLineWidth] = useState(2)
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight - 80

    // Set default styles
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    // Save initial state
    saveToHistory()
  }, [])

  const saveToHistory = () => {
    const canvas = canvasRef.current
    const imageData = canvas.toDataURL()
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(imageData)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const startDrawing = (e) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.lineWidth = lineWidth
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color
    ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over"

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      saveToHistory()
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    saveToHistory()
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      restoreFromHistory(historyIndex - 1)
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      restoreFromHistory(historyIndex + 1)
    }
  }

  const restoreFromHistory = (index) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const img = new Image()
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
    }
    img.src = history[index]
  }

  const downloadCanvas = () => {
    const canvas = canvasRef.current
    const link = document.createElement("a")
    link.download = "whiteboard.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  const tools = [
    { id: "pen", icon: Pen, label: "Pen" },
    { id: "eraser", icon: Eraser, label: "Eraser" },
    { id: "square", icon: Square, label: "Rectangle" },
    { id: "circle", icon: Circle, label: "Circle" },
    { id: "text", icon: Type, label: "Text" },
  ]

  const colors = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#FFC0CB",
    "#A52A2A",
    "#808080",
  ]

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Toolbar */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Collaborative Whiteboard</h1>
          </div>

          <div className="flex items-center space-x-6">
            {/* Tools */}
            <div className="flex items-center space-x-2">
              {tools.map((toolItem) => (
                <button
                  key={toolItem.id}
                  onClick={() => setTool(toolItem.id)}
                  className={`p-2 rounded-lg ${
                    tool === toolItem.id ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  title={toolItem.label}
                >
                  <toolItem.icon className="w-5 h-5" />
                </button>
              ))}
            </div>

            {/* Colors */}
            <div className="flex items-center space-x-1">
              {colors.map((colorOption) => (
                <button
                  key={colorOption}
                  onClick={() => setColor(colorOption)}
                  className={`w-6 h-6 rounded border-2 ${
                    color === colorOption ? "border-gray-400" : "border-gray-200"
                  }`}
                  style={{ backgroundColor: colorOption }}
                />
              ))}
            </div>

            {/* Line Width */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Size:</span>
              <input
                type="range"
                min="1"
                max="20"
                value={lineWidth}
                onChange={(e) => setLineWidth(e.target.value)}
                className="w-20"
              />
              <span className="text-sm text-gray-600 w-6">{lineWidth}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={undo}
                disabled={historyIndex <= 0}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                title="Undo"
              >
                <Undo className="w-5 h-5" />
              </button>

              <button
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                title="Redo"
              >
                <Redo className="w-5 h-5" />
              </button>

              <button onClick={clearCanvas} className="p-2 rounded-lg text-red-600 hover:bg-red-50" title="Clear All">
                <Trash2 className="w-5 h-5" />
              </button>

              <button
                onClick={downloadCanvas}
                className="p-2 rounded-lg text-green-600 hover:bg-green-50"
                title="Download"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="absolute inset-0 cursor-crosshair bg-white"
        />
      </div>
    </div>
  )
}
