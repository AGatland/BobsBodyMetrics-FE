import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import PublicProfile from './pages/PublicProfile'
import PrivateProfile from './pages/PrivateProfile'
import Header from './components/Header'

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<PrivateProfile />} />
        <Route path="/profile/{username}" element={<PublicProfile />} />
      </Routes>
    </div>
  )
}

export { App }
