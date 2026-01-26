import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Apply from './pages/Apply'
import Thesis from './pages/Thesis'
import Install from './pages/Install'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/thesis" element={<Thesis />} />
        <Route path="/install" element={<Install />} />
      </Routes>
    </Router>
  )
}
