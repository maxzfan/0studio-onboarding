import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const base = import.meta.env.BASE_URL

export default function Download() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-start px-8 py-16" style={{ fontFamily: 'InputMono, monospace' }}>
      <div className="max-w-2xl w-full flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-3xl font-light tracking-tight mb-4"
        >
          download 0studio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/50 text-sm mb-12"
        >
          choose your Mac architecture
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <motion.a
            href={`${base}0studio-1.0.0-arm64.dmg`}
            download="0studio-1.0.0-arm64.dmg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="px-8 py-3 bg-white text-black font-light hover:bg-white/90 transition-all text-sm tracking-wide"
          >
            download ARM64
          </motion.a>
          <motion.a
            href={`${base}0studio-1.0.0.dmg`}
            download="0studio-1.0.0.dmg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="px-8 py-3 border border-white/30 text-white font-light hover:bg-white/5 transition-all text-sm tracking-wide"
          >
            download Intel
          </motion.a>
        </div>
      </div>

      <Link
        to="/"
        className="mt-16 text-white/60 hover:text-white text-sm font-light tracking-wide transition-colors"
      >
        ← back
      </Link>
    </div>
  )
}
