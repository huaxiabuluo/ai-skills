import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import { ShadcnDemo } from './pages/ShadcnDemo'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shadcn" element={<ShadcnDemo />} />
      </Routes>
    </div>
  )
}

export default App