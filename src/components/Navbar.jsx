import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Navbar({ user, onLogout }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    setMenuOpen(false)
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    }
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.logo} onClick={() => navigate('/')}>
        Drive<span style={styles.accent}>Rex</span>
      </div>

      {/* Desktop links */}
      <ul style={styles.links}>
        <li style={styles.link} onClick={() => {
          if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else { navigate('/') }
        }}>Home</li>
        <li style={styles.link} onClick={() => scrollToSection('fleet')}>Fleet</li>
        <li style={styles.link} onClick={() => navigate('/locations')}>Locations</li>
        <li style={styles.link} onClick={() => navigate('/pricing')}>Pricing</li>
        <li style={styles.link} onClick={() => navigate('/about')}>About</li>
        <li style={styles.link} onClick={() => navigate('/admin')}>Admin</li>
      </ul>

      {/* Desktop auth */}
      <div style={styles.desktopAuth}>
        {user ? (
          <div style={styles.userRow}>
            <span style={styles.userName}>Hi, {user}! 👋</span>
            <button style={styles.logoutBtn} onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <div style={styles.authRow}>
            <button style={styles.ghostBtn} onClick={() => navigate('/login')}>Sign in</button>
            <button style={styles.primaryBtn} onClick={() => navigate('/signup')}>Get started</button>
          </div>
        )}
      </div>

      {/* Hamburger button */}
      <button
        style={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          <div style={styles.mobileLink} onClick={() => { navigate('/'); setMenuOpen(false) }}>Home</div>
          <div style={styles.mobileLink} onClick={() => scrollToSection('fleet')}>Fleet</div>
          <div style={styles.mobileLink} onClick={() => { navigate('/locations'); setMenuOpen(false) }}>Locations</div>
          <div style={styles.mobileLink} onClick={() => { navigate('/pricing'); setMenuOpen(false) }}>Pricing</div>
          <div style={styles.mobileLink} onClick={() => { navigate('/about'); setMenuOpen(false) }}>About</div>
          <div style={styles.mobileLink} onClick={() => { navigate('/admin'); setMenuOpen(false) }}>Admin</div>
          <div style={styles.mobileDivider}></div>
          {user ? (
            <>
              <div style={styles.mobileUser}>Hi, {user}! 👋</div>
              <button style={styles.mobileLogout} onClick={() => { onLogout(); setMenuOpen(false) }}>Logout</button>
            </>
          ) : (
            <>
              <button style={styles.mobileSignin} onClick={() => { navigate('/login'); setMenuOpen(false) }}>Sign in</button>
              <button style={styles.mobileSignup} onClick={() => { navigate('/signup'); setMenuOpen(false) }}>Get started</button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 48px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f0f0f0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    flexWrap: 'wrap',
  },
  logo: {
    fontWeight: '800',
    fontSize: '22px',
    color: '#0a0a0a',
    letterSpacing: '-0.5px',
    cursor: 'pointer',
  },
  accent: { color: '#2563eb' },
  links: {
    display: 'flex',
    gap: '32px',
    listStyle: 'none',
    '@media (max-width: 768px)': { display: 'none' },
  },
  link: {
    fontSize: '14px',
    color: '#6b7280',
    cursor: 'pointer',
    fontWeight: '500',
  },
  desktopAuth: {},
  authRow: { display: 'flex', gap: '10px', alignItems: 'center' },
  ghostBtn: {
    background: 'transparent',
    color: '#0a0a0a',
    border: '1.5px solid #e5e7eb',
    padding: '9px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  primaryBtn: {
    background: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '9px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  userRow: { display: 'flex', alignItems: 'center', gap: '12px' },
  userName: { fontSize: '14px', color: '#374151', fontWeight: '500' },
  logoutBtn: {
    background: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    cursor: 'pointer',
  },
  hamburger: {
    display: 'none',
    background: 'transparent',
    border: 'none',
    fontSize: '22px',
    cursor: 'pointer',
    color: '#0a0a0a',
    padding: '4px',
  },
  mobileMenu: {
    width: '100%',
    background: 'white',
    borderTop: '1px solid #f0f0f0',
    padding: '16px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  mobileLink: {
    padding: '12px 24px',
    fontSize: '15px',
    color: '#374151',
    fontWeight: '500',
    cursor: 'pointer',
    borderRadius: '8px',
    margin: '0 8px',
  },
  mobileDivider: {
    height: '1px',
    background: '#f0f0f0',
    margin: '8px 0',
  },
  mobileUser: {
    padding: '12px 24px',
    fontSize: '14px',
    color: '#6b7280',
  },
  mobileLogout: {
    margin: '4px 16px',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  mobileSignin: {
    margin: '4px 16px',
    background: 'transparent',
    color: '#0a0a0a',
    border: '1.5px solid #e5e7eb',
    padding: '12px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  mobileSignup: {
    margin: '4px 16px',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
}

// Inject responsive CSS
const style = document.createElement('style')
style.textContent = `
  @media (max-width: 768px) {
    nav ul { display: none !important; }
    nav .desktop-auth { display: none !important; }
  }
`
document.head.appendChild(style)

export default Navbar