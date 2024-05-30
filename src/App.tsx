import { Navigate, Routes, Route } from 'react-router'
import { HashRouter as Router } from 'react-router-dom'
import Home from '@/pages/Home/index.tsx'
import Weight from '@/pages/Weight/index.tsx'
import WeightOverview from '@/pages/Weight/Overview.tsx'
import Diet from '@/pages/Diet/index.tsx'
import Layout from '@/components/Layout/index.tsx'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/weight" element={<Weight />} />
          <Route path="/weight/overview" element={<WeightOverview />} />
          <Route path="/diet" element={<Diet />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
