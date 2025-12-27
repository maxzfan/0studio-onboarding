import CubeAnimation from "../components/ui/ascii-cube"

export default function Creator() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center">
        <h1 
          className="text-white text-3xl font-light tracking-tight" 
          style={{ fontFamily: 'InputMono', fontWeight: 400 }}
        >
          0studio
        </h1>
        <p 
          className="text-white text-sm font-light tracking-wide mt-2 opacity-70" 
          style={{ fontFamily: 'InputMono', fontWeight: 400 }}
        >
          for creators, by creators
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
      
      {/* waitlist and thesis links */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center space-y-4">
        <a 
          href="/apply"
          className="text-white text-sm font-light tracking-wide hover:opacity-70 transition-opacity"
          style={{ fontFamily: 'InputMono', fontWeight: 400 }}
        >
          join the waitlist
        </a>
        <a 
          href="/thesis"
          className="text-white text-sm font-light tracking-wide hover:opacity-70 transition-opacity"
          style={{ fontFamily: 'InputMono', fontWeight: 400 }}
        >
          about us
        </a>
      </div>
    </div>
  )
}
