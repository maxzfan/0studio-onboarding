import { useEffect } from 'react'
import { renderCanvas } from '../components/ui/canvas'

export default function Landing() {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black relative">
      <canvas
        className="pointer-events-none fixed inset-0 z-0"
        id="canvas"
      ></canvas>
      
      <div className="absolute top-10 flex flex-col items-center z-10">
        <h1 className="text-white text-6xl font-light tracking-tight" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>adari</h1>
        <p className="text-white text-sm font-light tracking-wide mt-2 opacity-70" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>powers effortless brand deals.</p>
      </div>
      
      <div className="flex gap-50 items-center z-10">
        <a 
          href="/creator"
          className="text-white text-4xl font-light tracking-wide px-16 py-6 border-2 border-white/30 rounded-full hover:bg-white/10 transition-all"
          style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
        >
          i'm a creator
        </a>
        
        <button 
          className="text-white text-4xl font-light tracking-wide px-16 py-6 border-2 border-white/30 rounded-full hover:bg-white/10 transition-all"
          style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
        >
          i'm a brand
        </button>
      </div>
    </div>
  )
}
