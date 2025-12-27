import CubeAnimation from "../components/ui/ascii-cube"

export default function Creator() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center">
        <a href="/">
          <h1 
            className="text-white text-6xl font-light tracking-tight cursor-pointer hover:opacity-80 transition-opacity" 
            style={{ fontFamily: 'Geist Sans, sans-serif', fontWeight: 300 }}
          >
            adari
          </h1>
        </a>
        <p 
          className="text-white text-sm font-light tracking-wide mt-2 opacity-70" 
          style={{ fontFamily: 'Geist Sans, sans-serif', fontWeight: 300 }}
        >
          you could be here.
        </p>
      </div>
      
      {/* ASCII Cube - centered */}
      <div className="text-white scale-75 md:scale-90 lg:scale-100">
        <CubeAnimation 
          wireframe={true}
          edges={true}
          speedA={0.02}
          speedB={0.015}
          axis="xy"
        />
      </div>
      
      {/* How it works link */}
      <a 
        href="/apply"
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 text-white text-lg font-light tracking-wide hover:opacity-70 transition-opacity"
        style={{ fontFamily: 'Geist Sans, sans-serif', fontWeight: 300 }}
      >
        how it works
      </a>
    </div>
  )
}
