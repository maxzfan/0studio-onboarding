import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Creator from './pages/Creator'
import Apply from './pages/Apply'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/creator" element={<Creator />} />
        <Route path="/apply" element={<Apply />} />
      </Routes>
    </Router>
  )
}
