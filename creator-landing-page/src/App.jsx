import { ThreeDPhotoCarousel } from "./components/3d-carousel"
import Steps from "./components/Steps"
import EarningsCalc from "./components/EarningsCalc"
import SocialProof, { useCreatorsCount } from "./components/SocialProof"
import { useEffect } from "react"
import { renderCanvas } from "./components/ui/canvas"

export default function App() {
  const creators = useCreatorsCount();
  
  useEffect(() => {
    renderCanvas();
  }, []);
  
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory relative bg-black">
      <canvas
        className="pointer-events-none fixed inset-0 z-0"
        id="canvas"
      ></canvas>
      
      {/* Hero Section */}
      <section className="h-screen w-full flex flex-col items-center justify-center bg-transparent select-none snap-start relative z-10" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
        <div className="absolute top-10 flex flex-col items-center">
          <h1 className="text-white text-6xl font-light tracking-tight" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>adari</h1>
          <p className="text-white text-sm font-light tracking-wide mt-2 opacity-70" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>gets you brand deals, effortlessly.</p>
        </div>
        <div className="w-full max-w-4xl px-4">
          <div className="min-h-[500px] flex flex-col justify-center">
            <div className="p-2">
              <ThreeDPhotoCarousel />
            </div>
          </div>
        </div>
        <button 
          onClick={scrollToHowItWorks}
          className="absolute bottom-12 text-white text-lg font-light tracking-wide hover:opacity-70 transition-opacity"
          style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
        >
          how it works
        </button>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="h-screen w-full flex flex-col items-center justify-center bg-transparent select-none snap-start px-8 py-8 relative z-10 overflow-hidden" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
        <div className="max-w-6xl w-full h-full flex flex-col justify-center space-y-12">
          <Steps />
          <EarningsCalc />
          
          {/* Join Now Button */}
          <div className="w-full flex flex-col items-center gap-4">
            <a 
              href="https://form.typeform.com/to/RmOcyei9?typeform-source=external"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl font-light tracking-wide px-12 py-4 border border-white/30 rounded-full hover:bg-white/10 transition-all"
              style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}
            >
              join {creators.toLocaleString()}+ creators now
            </a>
            
            <p className="text-white/70 text-base font-light text-center" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 300 }}>
              we'll make sure you're happy with what we make.<br />
              <a 
                href="mailto:cik@mit.edu" 
                className="text-white hover:text-white/90 underline"
              >
                email us
              </a> with questions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
