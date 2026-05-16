import { useState, useEffect } from 'react'
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
import VerifyEmail from './pages/VerifyEmail'
import MyBookings from './pages/MyBookings'

function PageLoader() {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      <div style={{textAlign: 'center'}}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #e5e7eb',
          borderTop: '3px solid #2563eb',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 16px',
        }}></div>
        <div style={{fontWeight: '800', fontSize: '20px', color: '#0a0a0a'}}>
          Drive<span style={{color: '#2563eb'}}>Rex</span>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const handleLogin = (name) => {
    setUser(name)
    window.location.href = '/'
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    setUser(null)
  }

  if (loading) return <PageLoader />

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
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App