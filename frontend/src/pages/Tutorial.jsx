import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { releases } from '../data/releases'

// Reusable Version Update component
const VersionUpdate = ({ version, features, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="mb-6 last:mb-0"
  >
    <h3 
      className="text-white text-base font-light mb-3 flex items-center gap-3"
      style={{ fontFamily: 'InputMono, monospace' }}
    >
      <span className="px-2 py-1 border border-white/30 text-xs">{version}</span>
    </h3>
    <ul className="space-y-2 text-white/50 text-sm">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="text-white/60">✓</span>
          {feature}
        </li>
      ))}
    </ul>
  </motion.div>
)

export default function Tutorial() {
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'InputMono, monospace' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-light tracking-tight">
              0studio
            </Link>
            <Link 
              to="/"
              className="text-white/50 hover:text-white transition-colors text-sm"
            >
              ← back to home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 mb-8">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              <span className="text-xs text-white/60">tutorial & updates</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-light tracking-tight mb-6">
              how to use
              <br />
              <span className="text-white/50">0studio</span>
            </h1>
            
            <p className="text-base text-white/50 max-w-xl mx-auto leading-relaxed">
              watch the demo below to see 0studio in action.
            </p>
          </motion.div>

          {/* Video Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="border border-white/10 p-4">
              <video
                className="w-full aspect-video bg-black"
                controls
                playsInline
              >
                <source src="/demo_v1.0.0.mov" type="video/quicktime" />
                <source src="/demo_v1.0.0.mov" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>

          {/* New Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border border-white/10 p-6 mb-16"
          >
            <h2 className="text-white text-lg font-light mb-4">[new features]</h2>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              new features and updates will be described here as we continue to build 0studio.
              stay tuned for exciting improvements to your workflow.
            </p>
            
            {releases.map((release, index) => (
              <VersionUpdate
                key={release.version}
                version={release.version}
                features={release.features}
                delay={0.5 + index * 0.1}
              />
            ))}

            <div className="border-t border-white/10 pt-6 mt-6">
              <p className="text-white/50 text-sm leading-relaxed">
                have questions or feature requests? reach out to us at{' '}
                <a 
                  href="mailto:founders@0studio.xyz" 
                  className="text-white/70 underline hover:text-white transition-colors"
                >
                  founders@0studio.xyz
                </a>
              </p>
            </div>
          </motion.div>

          {/* What's Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl font-light mb-4">
              what's next?
            </h2>
            <p className="text-white/50 mb-8 max-w-lg mx-auto">
              ready to start using 0studio? install the app and supercharge your design workflow today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/install"
                className="px-8 py-3 bg-white text-black font-light hover:bg-white/90 transition-all text-sm"
              >
                install 0studio
              </Link>
              <Link 
                to="/"
                className="px-8 py-3 border border-white/30 text-white font-light hover:bg-white/5 transition-all text-sm"
              >
                back to home
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} 0studio. all rights reserved.
            </p>
            <a 
              href="mailto:founders@0studio.xyz"
              className="text-white/40 hover:text-white transition-colors text-sm"
            >
              founders@0studio.xyz
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
