export default function Thesis() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-start px-8 py-16">
      {/* Header */}
      <div className="mb-12 flex flex-col items-center text-center">
        <h1
          className="text-white text-3xl font-light tracking-tight mb-3"
          style={{ fontFamily: 'InputMono', fontWeight: 400 }}
        >
          0studio — version control for architects
        </h1>
        <p
          className="text-white/60 text-sm font-light tracking-wide"
          style={{ fontFamily: 'InputMono', fontWeight: 400 }}
        >
          Colin Kim (MIT Architecture + AI), Max Fan (Stanford CS)
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl w-full">
        <div
          className="text-white text-base leading-relaxed font-light tracking-wide space-y-10"
          style={{ fontFamily: 'InputMono', fontWeight: 400 }}
        >
          <section className="space-y-4">
            <h2 className="text-white text-xl font-light tracking-tight">Background</h2>
            <p className="text-justify">
              Every architect we've talked to manages the same invisible overhead: keeping track of which Rhino file is the latest, remembering why you went back to the scheme from two weeks ago, figuring out how to show a client three options without your desktop turning into a crime scene. Generic cloud tools like Dropbox and Google Drive, as well as communication software like email and Slack, were built for documents and spreadsheets. They have no idea what a .3dm file is, let alone how to render a preview of one or compare one to a different version of itself. This has led studios to develop their own rituals and naming conventions for files, so every new hire has to be re-taught from scratch and increasing iteration becomes a real logistical issue.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-white text-xl font-light tracking-tight">Our Product</h2>
            <p className="text-justify">
              0studio sits alongside your existing tools — Rhino, Revit, whatever you use — and handles the one thing those tools have never cared about: your project history. Our mission is to become a map of every decision you and your team have made along the design process and altogether eliminate messy file management. Our features include:
            </p>
            <ul className="space-y-3 pl-6 list-none">
              <li className="text-justify">
                <span className="text-white">— Cloud sync.</span> No more uploading or downloading files, no more Slack or email. You only need one file on your computer from beginning to end, and when you push or pull versions with 0studio your design software and local file is perfectly synced. Everything is shared with your team.
              </li>
              <li className="text-justify">
                <span className="text-white">— Version Tree.</span> Visualize your entire project history as a legible tree. Branch off of past versions to explore ideas without commitment. Leave comments on nodes for your team to see, search and filter through every past version.
              </li>
              <li className="text-justify">
                <span className="text-white">— 3D Preview.</span> See previews of files before you push or pull them, so you never have to open a file blind. Gallery mode lets you directly compare multiple versions on the same screen to visualize every specific design choice.
              </li>
              <li className="text-justify">
                <span className="text-white">— Live Collaboration.</span> Know who's working on what in real time through Google Docs-like user presences and status messages. No more "which version did you edit?" texts.
              </li>
            </ul>
            <p className="text-justify">
              Critically, our mission is to never interfere with the design process itself. We never interact with your software, only with your files. This means that you never have to migrate from the Rhino and Revit you've been using throughout your career, or really learn anything new. The app reads your files and stores them, that's it.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-white text-xl font-light tracking-tight">About Us</h2>
            <p className="text-justify">
              Colin is the only architecture/CS double major at MIT, and Max grew up as an elite pianist. We understand better than anyone the work of an architect as an artist and designer. We're committed to removing friction from the design process so new ideas never have to be a burden. We currently support Rhino and Revit on Windows and Mac.
            </p>
            <p>
              — colin & max, <a href="mailto:founders@0studio.xyz" className="underline hover:opacity-70 transition-opacity">founders@0studio.xyz</a>
            </p>
          </section>
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
