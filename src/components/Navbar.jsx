function Navbar({ user, onLogout }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo} onClick={() => window.location.href='/'}>
        Drive<span style={styles.accent}>Rex</span>
      </div>
      <ul style={styles.links}>
      <li style={styles.link} onClick={() => {
  if (window.location.pathname === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    window.location.href = '/'
  }
}}>Home</li>
  <li style={styles.link} onClick={() => {
    const fleet = document.getElementById('fleet')
    if (fleet) {
      fleet.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/'
    }
  }}>Fleet</li>
  <li style={styles.link} onClick={() => window.location.href='/locations'}>Locations</li>
  <li style={styles.link} onClick={() => window.location.href='/pricing'}>Pricing</li>
  <li style={styles.link} onClick={() => window.location.href='/about'}>About</li>
  <li style={styles.link} onClick={() => window.location.href='/admin'}>Admin</li>
</ul>
      {user ? (
        <div style={styles.userRow}>
          <span style={styles.userName}>Hi, {user}! 👋</span>
          <button style={styles.logoutBtn} onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <div style={styles.authRow}>
          <button style={styles.ghostBtn} onClick={() => window.location.href='/login'}>
            Sign in
          </button>
          <button style={styles.primaryBtn} onClick={() => window.location.href='/signup'}>
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
    transition: 'color 0.2s',
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