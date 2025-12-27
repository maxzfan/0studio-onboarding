import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Creator from './pages/Creator'
import Apply from './pages/Apply'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Creator />} />
        <Route path="/apply" element={<Apply />} />
      </Routes>
    </Router>
  )
}
