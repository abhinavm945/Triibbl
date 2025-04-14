import { useEffect, useRef } from 'react'
import { useCanvas } from '../hooks/useCanvas'
import { socket } from '../services/socket'

export default function Canvas({ roomId }) {
  const canvasRef = useRef(null)
  const { startDrawing, draw, endDrawing, clearCanvas } = useCanvas(canvasRef)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    socket.on('drawing', (data) => {
      if (data.roomId === roomId) {
        drawFromData(ctx, data)
      }
    })

    return () => {
      socket.off('drawing')
    }
  }, [roomId])

  const drawFromData = (ctx, { x, y, prevX, prevY, color, lineWidth }) => {
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(x, y)
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.lineCap = 'round'
    ctx.stroke()
    ctx.closePath()
  }

  return (
    <div className="relative bg-white rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        className="cursor-crosshair"
      />
      <button 
        onClick={clearCanvas}
        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
      >
        Clear
      </button>
    </div>
  )
}