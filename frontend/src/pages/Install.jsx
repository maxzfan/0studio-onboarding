import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Copy button component
const CopyButton = ({ text, label }) => {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  
  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1 text-xs border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all"
      style={{ fontFamily: 'InputMono, monospace' }}
    >
      {copied ? 'copied!' : label || 'copy'}
    </button>
  )
}

// Step component
const InstallStep = ({ number, title, description, command, commands, note, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="mb-12"
  >
    <div className="flex items-start gap-6">
      <div className="flex-shrink-0">
        <div 
          className="w-12 h-12 border border-white/30 flex items-center justify-center text-white font-light text-lg"
          style={{ fontFamily: 'InputMono, monospace' }}
        >
          {number}
        </div>
      </div>
      <div className="flex-1">
        <h3 
          className="text-white text-xl font-light tracking-wide mb-3"
          style={{ fontFamily: 'InputMono, monospace' }}
        >
          {title}
        </h3>
        {description && (
          <p 
            className="text-white/50 leading-relaxed mb-4"
            style={{ fontFamily: 'InputMono, monospace' }}
          >
            {description}
          </p>
        )}
        {command && (
          <div className="bg-white/5 border border-white/10 p-4 mb-3">
            <div className="flex items-center justify-between gap-4">
              <code 
                className="text-emerald-400 text-sm break-all"
                style={{ fontFamily: 'InputMono, monospace' }}
              >
                {command}
              </code>
              <CopyButton text={command} />
            </div>
          </div>
        )}
        {commands && commands.map((cmd, index) => (
          <div key={index} className="bg-white/5 border border-white/10 p-4 mb-3">
            <div className="flex items-center justify-between gap-4">
              <code 
                className="text-emerald-400 text-sm break-all"
                style={{ fontFamily: 'InputMono, monospace' }}
              >
                {cmd}
              </code>
              <CopyButton text={cmd} />
            </div>
          </div>
        ))}
        {note && (
          <p 
            className="text-white/40 text-sm italic"
            style={{ fontFamily: 'InputMono, monospace' }}
          >
            {note}
          </p>
        )}
      </div>
    </div>
  </motion.div>
)

export default function Install() {
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
              <span className="text-xs text-white/60">installation guide</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-light tracking-tight mb-6">
              get started with
              <br />
              <span className="text-white/50">0studio</span>
            </h1>
            
            <p className="text-base text-white/50 max-w-xl mx-auto leading-relaxed">
              follow these simple steps to install 0studio on your mac. 
              don't worry if you're new to this — we'll guide you through each step.
            </p>
          </motion.div>

          {/* What You'll Need */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border border-white/10 p-6 mb-16"
          >
            <h2 className="text-white text-lg font-light mb-4">[before you begin]</h2>
            <ul className="space-y-3 text-white/50 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-white/60">✓</span>
                a mac computer (macOS 10.15 or later)
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white/60">✓</span>
                about 5 minutes of your time
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white/60">✓</span>
                an internet connection
              </li>
            </ul>
          </motion.div>

          {/* Installation Steps */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <span className="text-white/40 text-xs tracking-wider mb-6 block">[installation steps]</span>
            </motion.div>

            <InstallStep
              number="01"
              title="open Terminal"
              description="press Command (⌘) + Space to open Spotlight, type 'Terminal', and press Enter. a window with a text prompt will appear."
              delay={0.3}
            />

            <InstallStep
              number="02"
              title="install Homebrew (if you haven't already)"
              description="Homebrew makes installing software on your Mac super easy. copy and paste this command, then press Enter:"
              command='/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
              delay={0.4}
            />

            <InstallStep
              number="03"
              title="install 0studio"
              description="copy and paste these commands one at a time, pressing Enter after each:"
              commands={["brew tap inkykim/0studio", "brew install --cask 0studio"]}
              note="the installation usually takes 1-2 minutes depending on your internet speed."
              delay={0.5}
            />

            <InstallStep
              number="04"
              title="launch 0studio"
              description="that's it! you can now find 0studio in your Applications folder, or launch it from Spotlight."
              note="0studio will open and guide you through connecting your design tools."
              delay={0.6}
            />
          </div>

          {/* Troubleshooting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="border border-white/10 p-6 mb-16"
          >
            <h2 className="text-white text-lg font-light mb-4">[need help?]</h2>
            <p className="text-white/50 text-sm mb-4 leading-relaxed">
              if you run into any issues during installation, don't worry — we're here to help:
            </p>
            <ul className="space-y-3 text-white/50 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-white/40">→</span>
                <span>
                  <strong className="text-white/70">"command not found"</strong> — make sure you copied the entire command and try again
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white/40">→</span>
                <span>
                  <strong className="text-white/70">permission errors</strong> — you may need to enter your mac's password when prompted
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white/40">→</span>
                <span>
                  <strong className="text-white/70">still stuck?</strong> — email us at{' '}
                  <a href="mailto:founders@0studio.xyz" className="text-white/70 underline hover:text-white transition-colors">
                    founders@0studio.xyz
                  </a>
                  {' '}and we'll walk you through it personally
                </span>
              </li>
            </ul>
          </motion.div>

          {/* What's Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center"
          >
            <h2 className="text-2xl font-light mb-4">
              what's next?
            </h2>
            <p className="text-white/50 mb-8 max-w-lg mx-auto">
              you're ready to level up your workflow with 0studio!
              here's a quick video guide to get you started.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/"
                className="px-8 py-3 border border-white/30 text-white font-light hover:bg-white/5 transition-all text-sm"
              >
                back to home
              </Link>
              <a 
                href="mailto:founders@0studio.xyz"
                className="px-8 py-3 bg-white text-black font-light hover:bg-white/90 transition-all text-sm"
              >
                contact us
              </a>
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
