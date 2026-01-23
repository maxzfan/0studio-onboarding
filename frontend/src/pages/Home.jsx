import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Animated counter component
const AnimatedCounter = ({ end, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let startTime
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration])
  
  return <span>{count}{suffix}</span>
}

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="bg-black p-8 hover:bg-white/5 transition-all duration-300 group"
  >
    <div className="w-8 h-8 border border-white/20 flex items-center justify-center mb-6 group-hover:border-white/40 transition-colors">
      {icon}
    </div>
    <h3 className="text-white text-base font-light tracking-wide mb-3" style={{ fontFamily: 'InputMono, monospace' }}>{title}</h3>
    <p className="text-white/40 leading-relaxed text-sm" style={{ fontFamily: 'InputMono, monospace' }}>{description}</p>
  </motion.div>
)

// Workflow Step Component
const WorkflowStep = ({ number, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="flex gap-6 group"
  >
    <div className="flex-shrink-0">
      <div className="w-12 h-12 border border-white/30 flex items-center justify-center text-white font-light text-lg group-hover:border-white/60 transition-colors" style={{ fontFamily: 'InputMono, monospace' }}>
        {number}
      </div>
    </div>
    <div className="pt-1">
      <h3 className="text-white text-lg font-light tracking-wide mb-2" style={{ fontFamily: 'InputMono, monospace' }}>{title}</h3>
      <p className="text-white/50 leading-relaxed text-sm" style={{ fontFamily: 'InputMono, monospace' }}>{description}</p>
    </div>
  </motion.div>
)

// Testimonial Card Component
const TestimonialCard = ({ quote, author, role, company }) => (
  <div className="border border-white/10 p-8">
    <p className="text-white/70 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'InputMono, monospace' }}>"{quote}"</p>
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
        <span className="text-white/70 font-light" style={{ fontFamily: 'InputMono, monospace' }}>{author[0]}</span>
      </div>
      <div>
        <p className="text-white font-light text-sm" style={{ fontFamily: 'InputMono, monospace' }}>{author}</p>
        <p className="text-white/40 text-xs" style={{ fontFamily: 'InputMono, monospace' }}>{role}, {company}</p>
      </div>
    </div>
  </div>
)

// FAQ Item Component
const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div 
    className="border-b border-white/10 cursor-pointer"
    onClick={onClick}
  >
    <div className="py-6 flex items-center justify-between">
      <h4 className="text-white text-base font-light pr-8" style={{ fontFamily: 'InputMono, monospace' }}>{question}</h4>
      <div className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
        <span className="text-white/40 text-xl font-light">+</span>
      </div>
    </div>
    <motion.div
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <p className="text-white/50 pb-6 leading-relaxed text-sm" style={{ fontFamily: 'InputMono, monospace' }}>{answer}</p>
    </motion.div>
  </div>
)

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: "version history",
      description: "track every design decision. branch off, backtrack, and explore without fear of losing work."
    },
    {
      icon: <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      title: "real-time collaboration",
      description: "work together seamlessly. see changes instantly, comment in context, and stay aligned."
    },
    {
      icon: <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
      title: "single source of truth",
      description: "no more _final_final_v7.blend files. one project, one location, always in sync."
    },
    {
      icon: <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      title: "tool agnostic",
      description: "works with your existing software stack. blender, rhino, sketchup — we sync them all."
    }
  ]

  const workflow = [
    { title: "connect your tools", description: "link your favorite 3D software in minutes. no complex setup required." },
    { title: "design freely", description: "work as you always have. we track changes automatically in the background." },
    { title: "collaborate & review", description: "share with your team, get feedback, and iterate together in real-time." },
    { title: "ship with confidence", description: "deploy to production knowing every decision is tracked and reversible." }
  ]

  const testimonials = [
    {
      quote: "0studio changed how our architecture firm handles design iterations. no more hunting through folders for the right version.",
      author: "Sarah Chen",
      role: "Principal",
      company: "Chen Architecture"
    },
    {
      quote: "we reduced our project handoff time by 60%. the version control alone makes it invaluable for our workflow.",
      author: "Marcus Reid",
      role: "Design Director",
      company: "Form Studio"
    },
    {
      quote: "finally, a tool that understands 3D modeling is iterative. branching and merging designs is a game-changer.",
      author: "Elena Voss",
      role: "Lead Designer",
      company: "Voss Collective"
    }
  ]

  const faqs = [
    {
      question: "what 3D software does 0studio support?",
      answer: "we currently support blender, rhino, sketchup, and revit, with more coming soon. our plugin architecture makes it easy to add new tools."
    },
    {
      question: "how is this different from dropbox or google drive?",
      answer: "unlike generic cloud storage, 0studio understands your 3D files. we track meaningful changes, enable branching and merging, and provide visual diffs for your designs."
    },
    {
      question: "can I use 0studio with my existing projects?",
      answer: "absolutely. import your existing projects and start tracking changes immediately. we'll create an initial snapshot and begin versioning from there."
    },
    {
      question: "what happens to my files if I cancel?",
      answer: "your files remain yours. export everything at any time, and we'll help you transition if needed. no lock-in, ever."
    },
    {
      question: "is my data secure?",
      answer: "yes. we use end-to-end encryption, SOC 2 compliant infrastructure, and your files are never shared without explicit permission."
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{ fontFamily: 'InputMono, monospace' }}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-light tracking-tight">
              0studio
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-white/50 hover:text-white transition-colors text-sm">[features]</a>
              <a href="#workflow" className="text-white/50 hover:text-white transition-colors text-sm">[how it works]</a>
              <a href="#testimonials" className="text-white/50 hover:text-white transition-colors text-sm">[testimonials]</a>
              <a href="#faq" className="text-white/50 hover:text-white transition-colors text-sm">[faq]</a>
            </div>
            
            <div className="flex items-center gap-4">
              <Link 
                to="/apply"
                className="px-5 py-2 border border-white/30 text-white text-sm hover:bg-white hover:text-black transition-all"
              >
                request demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 mb-12">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              <span className="text-xs text-white/60">now accepting early access applications</span>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-light tracking-tight mb-8 leading-[1.2]"
          >
            one source of truth
            <br />
            <span className="text-white/50">
              for 3D design teams
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base text-white/50 max-w-xl mx-auto mb-12 leading-relaxed"
          >
            version control, real-time collaboration, and design history for your 3D modeling workflow. 
            from ideation to production, keep your team in perfect sync.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              to="/apply"
              className="px-8 py-3 bg-white text-black font-light hover:bg-white/90 transition-all text-sm tracking-wide"
            >
              request a demo
            </Link>
            <a 
              href="#features"
              className="px-8 py-3 border border-white/30 text-white font-light hover:bg-white/5 transition-all text-sm tracking-wide"
            >
              learn more
            </a>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <span className="text-white/30 text-sm">↓</span>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-light text-white mb-2">
                <AnimatedCounter end={100} suffix="+" />
              </div>
              <p className="text-white/40 text-sm">design teams</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-light text-white mb-2">
                <AnimatedCounter end={50} suffix="k+" />
              </div>
              <p className="text-white/40 text-sm">files synced</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-light text-white mb-2">
                <AnimatedCounter end={99} suffix="%" />
              </div>
              <p className="text-white/40 text-sm">uptime</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-light text-white mb-2">
                <AnimatedCounter end={4} suffix="+" />
              </div>
              <p className="text-white/40 text-sm">integrations</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-white/40 text-xs tracking-wider mb-6 block">[01 features]</span>
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              not just file sync —<br />
              <span className="text-white/40">we deliver design intelligence.</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-px bg-white/10">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-24 border-y border-white/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-white/40 text-xs tracking-wider mb-6 block">[the problem]</span>
              <h2 className="text-2xl md:text-3xl font-light mb-6">
                3D modeling is iterative.
                <br />
                <span className="text-white/40">your file system isn't.</span>
              </h2>
              <div className="space-y-3 text-white/50 text-sm">
                <p className="flex items-start gap-3">
                  <span className="text-white/30">×</span>
                  every design decision creates more copies
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-white/30">×</span>
                  email attachments break downstream work
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-white/30">×</span>
                  new ideas feel like a burden, not an asset
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="border border-white/10 p-8"
            >
              <span className="text-white/40 text-xs tracking-wider mb-6 block">[the solution]</span>
              <h2 className="text-2xl md:text-3xl font-light mb-6">
                0studio keeps everything
                <br />
                <span className="text-white/60">in perfect sync.</span>
              </h2>
              <div className="space-y-3 text-white/50 text-sm">
                <p className="flex items-start gap-3">
                  <span className="text-white/60">✓</span>
                  track your design history automatically
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-white/60">✓</span>
                  collaborate in real-time across tools
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-white/60">✓</span>
                  branch off & backtrack from your ideas freely
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-white/40 text-xs tracking-wider mb-6 block">[02 workflow]</span>
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              from 0 to production,<br />
              <span className="text-white/40">a clear path forward.</span>
            </h2>
          </motion.div>
          
          <div className="max-w-xl mx-auto space-y-10">
            {workflow.map((step, index) => (
              <WorkflowStep
                key={index}
                number={`0${index + 1}`}
                title={step.title}
                description={step.description}
                delay={index * 0.1}
              />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link 
              to="/apply"
              className="inline-flex items-center gap-3 px-8 py-3 bg-white text-black font-light hover:bg-white/90 transition-all text-sm"
            >
              get started
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 border-y border-white/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-white/40 text-xs tracking-wider mb-6 block">[03 testimonials]</span>
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              real stories from<br />
              <span className="text-white/40">design teams like yours.</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-black"
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-white/40 text-xs tracking-wider mb-6 block">[04 faq]</span>
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              smarter decisions start<br />
              <span className="text-white/40">with clear answers.</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-light mb-6">
              ready to eliminate<br />
              <span className="text-white/50">
                file chaos?
              </span>
            </h2>
            <p className="text-base text-white/50 mb-12 max-w-xl mx-auto">
              join design teams who've already transformed their workflow. 
              request a demo and see 0studio in action.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/apply"
                className="px-8 py-3 bg-white text-black font-light hover:bg-white/90 transition-all text-sm"
              >
                request a demo
              </Link>
              <a 
                href="mailto:founders@0studio.xyz"
                className="px-8 py-3 border border-white/30 text-white font-light hover:bg-white/5 transition-all text-sm"
              >
                contact sales
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link to="/" className="text-xl font-light tracking-tight mb-4 block">
                0studio
              </Link>
              <p className="text-white/40 text-sm max-w-sm mb-6">
                built for creators, by creators. from 0 to production, 
                we're your project's single source of truth.
              </p>
              <a 
                href="mailto:founders@0studio.xyz"
                className="text-white/60 hover:text-white transition-colors text-sm underline"
              >
                founders@0studio.xyz
              </a>
            </div>
            
            <div>
              <h4 className="text-white/60 text-sm mb-4">[product]</h4>
              <ul className="space-y-2 text-white/40 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">features</a></li>
                <li><a href="#workflow" className="hover:text-white transition-colors">how it works</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">testimonials</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">faq</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white/60 text-sm mb-4">[company]</h4>
              <ul className="space-y-2 text-white/40 text-sm">
                <li><Link to="/thesis" className="hover:text-white transition-colors">about us</Link></li>
                <li><Link to="/apply" className="hover:text-white transition-colors">request demo</Link></li>
                <li><a href="mailto:founders@0studio.xyz" className="hover:text-white transition-colors">contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} 0studio. all rights reserved.
            </p>
            <div className="flex items-center gap-6 text-white/30 text-xs">
              <a href="#" className="hover:text-white transition-colors">[privacy]</a>
              <a href="#" className="hover:text-white transition-colors">[terms]</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
