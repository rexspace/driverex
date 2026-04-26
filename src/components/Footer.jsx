function Footer() {
  return (
    <div style={styles.footer}>
      <div style={styles.top}>
        <div style={styles.brand}>
          <div style={styles.logo} onClick={() => window.location.href='/'}>
            Drive<span style={styles.accent}>Rex</span>
          </div>
          <p style={styles.tagline}>Premium car rentals across Nigeria.</p>
        </div>
        <div style={styles.linksGroup}>
          <div style={styles.linkCol}>
            <div style={styles.colTitle}>Company</div>
            <div style={styles.colLink} onClick={() => window.location.href='/about'}>About us</div>
            <div style={styles.colLink}>Careers</div>
            <div style={styles.colLink}>Press</div>
          </div>
          <div style={styles.linkCol}>
            <div style={styles.colTitle}>Support</div>
            <div style={styles.colLink}>Help center</div>
            <div style={styles.colLink}>Contact us</div>
            <div style={styles.colLink}>Safety</div>
          </div>
          <div style={styles.linkCol}>
            <div style={styles.colTitle}>Explore</div>
            <div style={styles.colLink} onClick={() => window.location.href='/pricing'}>Pricing</div>
            <div style={styles.colLink} onClick={() => window.location.href='/locations'}>Locations</div>
            <div style={styles.colLink} onClick={() => window.location.href='/admin'}>Admin</div>
          </div>
        </div>
      </div>
      <div style={styles.bottom}>
        <div style={styles.copy}>© 2026 DriveRex. Built by Rex.</div>
        <div style={styles.copy}>🇳🇬 Made in Nigeria</div>
      </div>
    </div>
  )
}

const styles = {
  footer: {
    backgroundColor: '#0a0a0a',
    padding: '64px 48px 32px',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '48px',
  },
  brand: { maxWidth: '240px' },
  logo: {
    fontWeight: '800',
    fontSize: '20px',
    color: 'white',
    marginBottom: '12px',
    cursor: 'pointer',
  },
  accent: { color: '#2563eb' },
  tagline: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.6',
  },
  linksGroup: { display: 'flex', gap: '64px' },
  linkCol: {},
  colTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '16px',
  },
  colLink: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #1f2937',
    paddingTop: '24px',
  },
  copy: { fontSize: '13px', color: '#4b5563' },
}

export default Footer