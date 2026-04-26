import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CarListings from './components/CarListings'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import BookCar from './pages/BookCar'
import Admin from './pages/Admin'
import About from './pages/About'
import Locations from './pages/Locations'
import Pricing from './pages/Pricing'

function PageWrapper({ user, onLogout, children }) {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Navbar user={user} onLogout={onLogout} />
      {children}
      <Footer />
    </div>
  )
}

function Home({ user, onLogout }) {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Navbar user={user} onLogout={onLogout} />
      <Hero />
      <CarListings />
      <Footer />
    </div>
  )
}

function App() {
  const [user, setUser] = useState(localStorage.getItem('name'))

  const handleLogin = (name) => {
    setUser(name)
    window.location.href = '/'
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    setUser(null)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/book/:carId" element={<BookCar />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={
          <PageWrapper user={user} onLogout={handleLogout}>
            <About />
          </PageWrapper>
        } />
        <Route path="/locations" element={
          <PageWrapper user={user} onLogout={handleLogout}>
            <Locations />
          </PageWrapper>
        } />
        <Route path="/pricing" element={
          <PageWrapper user={user} onLogout={handleLogout}>
            <Pricing />
          </PageWrapper>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App