import { useNavigate, useLocation } from 'react-router-dom'

function Navbar({ user, onLogout }) {
  const navigate = useNavigate()
  const location = useLocation()

  const scrollToSection = (id) => {
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
      <ul style={styles.links}>
  <li style={styles.link} 
    onMouseEnter={e => e.target.style.color = '#0a0a0a'}
    onMouseLeave={e => e.target.style.color = '#6b7280'}
    onClick={() => {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else { navigate('/') }
    }}>Home</li>
  <li style={styles.link}
    onMouseEnter={e => e.target.style.color = '#0a0a0a'}
    onMouseLeave={e => e.target.style.color = '#6b7280'}
    onClick={() => scrollToSection('fleet')}>Fleet</li>
  <li style={styles.link}
    onMouseEnter={e => e.target.style.color = '#0a0a0a'}
    onMouseLeave={e => e.target.style.color = '#6b7280'}
    onClick={() => navigate('/locations')}>Locations</li>
  <li style={styles.link}
    onMouseEnter={e => e.target.style.color = '#0a0a0a'}
    onMouseLeave={e => e.target.style.color = '#6b7280'}
    onClick={() => navigate('/pricing')}>Pricing</li>
  <li style={styles.link}
    onMouseEnter={e => e.target.style.color = '#0a0a0a'}
    onMouseLeave={e => e.target.style.color = '#6b7280'}
    onClick={() => navigate('/about')}>About</li>
  <li style={styles.link}
    onMouseEnter={e => e.target.style.color = '#0a0a0a'}
    onMouseLeave={e => e.target.style.color = '#6b7280'}
    onClick={() => navigate('/admin')}>Admin</li>
</ul>
      {user ? (
        <div style={styles.userRow}>
          <span style={styles.userName}>Hi, {user}! 👋</span>
          <button style={styles.logoutBtn} onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <div style={styles.authRow}>
          <button style={styles.ghostBtn} onClick={() => navigate('/login')}>
            Sign in
          </button>
          <button style={styles.primaryBtn} onClick={() => navigate('/signup')}>
            Get started
          </button>
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
  },
  link: {
    fontSize: '14px',
    color: '#6b7280',
    cursor: 'pointer',
    fontWeight: '500',
  },
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
}

export default Navbar