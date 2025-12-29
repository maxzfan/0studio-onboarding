export default function Thesis() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-start px-8 py-16">
      {/* Header */}
      <div className="mb-12 flex flex-col items-center">
        <h1 
          className="text-white text-3xl font-light tracking-tight mb-4" 
          style={{ fontFamily: 'InputMono', fontWeight: 400 }}
        >
          
        </h1>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl w-full">
        <div 
          className="text-white text-base leading-relaxed font-light tracking-wide space-y-6 text-justify"
          style={{ fontFamily: 'InputMono', fontWeight: 400 }}
        >

        <p>
            in architecture school, the first thing we learned was that ideation comes from iteration. 
            we don't think file management should get in the way of that.
          </p>

          <p>
            3D modeling is an inherently iterative process, yet the industry still works by passing files around. 
            every design decision creates copies. 
            manual saves, email with huge attachments, broken downstream work. 
            a new idea should be your greatest asset, but instead it often feels like a burden.
          </p>
          
          <p>
            0studio keeps all your existing tools in perfect sync.
            track your design history. 
            collaborate in real-time. 
            branch off & backtrack from your ideas. 
            from 0 to production, we're your project's single source of truth.
          </p>
          
          <p>
            if your project files have names like _final_final_v7 or you're running out of email attachment storage, <a href="/apply" className="underline hover:opacity-70 transition-opacity">give 0studio a try</a>.
          </p>

          <p>
            0studio is built for creators, by creators.<br />
            colin & max, <a href="mailto:founders@0studio.xyz" className="underline hover:opacity-70 transition-opacity">founders@0studio.xyz</a>
          </p>
        </div>
      </div>
      
      {/* Back link */}
      <a 
        href="/"
        className="mt-16 text-white text-sm font-light tracking-wide hover:opacity-70 transition-opacity"
        style={{ fontFamily: 'InputMono', fontWeight: 400 }}
      >
        ← back
      </a>
    </div>
  )
}