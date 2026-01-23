import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Creator from './pages/Creator'
import Apply from './pages/Apply'
import Thesis from './pages/Thesis'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creator" element={<Creator />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/thesis" element={<Thesis />} />
      </Routes>
    </Router>
  )
}
