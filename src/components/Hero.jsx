function Hero() {
  return (
    <div style={styles.hero}>
      <div style={styles.left}>
        <div style={styles.badge}>
          🇳🇬 Available in Abuja & Lagos
        </div>
        <h1 style={styles.heading}>
          The smartest way to<br />
          <span style={styles.accent}>rent a car</span> in Nigeria
        </h1>
        <p style={styles.subtext}>
          Premium vehicles at unbeatable rates. Book in minutes,
          drive the same day. No hidden fees, ever.
        </p>
        <div style={styles.actions}>
  <button style={styles.btnPrimary} onClick={() => {
    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })
  }}>Browse fleet →</button>
  <button style={styles.btnGhost} onClick={() => {
    window.location.href = '/pricing'
  }}>How it works</button>
</div>
        <div style={styles.stats}>
          <div style={styles.stat}>
            <div style={styles.statNum}>48+</div>
            <div style={styles.statLabel}>Cars available</div>
          </div>
          <div style={styles.divider}></div>
          <div style={styles.stat}>
            <div style={styles.statNum}>4.9★</div>
            <div style={styles.statLabel}>Average rating</div>
          </div>
          <div style={styles.divider}></div>
          <div style={styles.stat}>
            <div style={styles.statNum}>2,000+</div>
            <div style={styles.statLabel}>Happy renters</div>
          </div>
        </div>
      </div>
      <div style={styles.right}>
        <div style={styles.searchCard}>
          <h3 style={styles.searchTitle}>Find your car</h3>
          <div style={styles.field}>
            <label style={styles.label}>Pick-up location</label>
            <input style={styles.input} placeholder="Abuja, FCT" />
          </div>
          <div classname ="search-row" style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>From</label>
              <input style={styles.input} type="date" />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Until</label>
              <input style={styles.input} type="date" />
            </div>
          </div>
          <button style={styles.searchBtn} onClick={() => {
  document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })
}}>Search available cars</button>
          <div style={styles.trust}>
            🔒 No credit card required to search
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  hero: {
    display: 'flex',
    flexDirection: window.innerWidth < 768 ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: window.innerWidth < 768 ? '40px 20px' : '80px 48px',
    gap: '60px',
    backgroundColor: '#ffffff',
  },
  left: { flex: 1 },
  badge: {
    display: 'inline-block',
    background: '#eff6ff',
    color: '#2563eb',
    fontSize: '13px',
    fontWeight: '500',
    padding: '6px 14px',
    borderRadius: '100px',
    marginBottom: '24px',
    border: '1px solid #dbeafe',
  },
  heading: {
    fontSize: '52px',
    fontWeight: '800',
    lineHeight: '1.1',
    color: '#0a0a0a',
    marginBottom: '20px',
    letterSpacing: '-1.5px',
  },
  accent: { color: '#2563eb' },
  subtext: {
    fontSize: '16px',
    color: '#6b7280',
    lineHeight: '1.7',
    maxWidth: '420px',
    marginBottom: '36px',
  },
  actions: { display: 'flex', gap: '12px', marginBottom: '48px' },
  btnPrimary: {
    background: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  btnGhost: {
    background: 'transparent',
    color: '#374151',
    border: '1.5px solid #e5e7eb',
    padding: '14px 28px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  stat: {},
  statNum: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#0a0a0a',
    marginBottom: '2px',
  },
  statLabel: { fontSize: '12px', color: '#9ca3af' },
  divider: {
    width: '1px',
    height: '36px',
    background: '#e5e7eb',
  },
  right: { flex: 1 },
  searchCard: {
    background: '#ffffff',
    border: '1.5px solid #e5e7eb',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
  },
  searchTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0a0a0a',
    marginBottom: '24px',
  },
  field: { marginBottom: '16px', flex: 1 },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    width: '100%',
    background: '#f9fafb',
    border: '1.5px solid #e5e7eb',
    borderRadius: '10px',
    padding: '12px 14px',
    fontSize: '14px',
    color: '#0a0a0a',
    outline: 'none',
    boxSizing: 'border-box',
  },
  searchBtn: {
    width: '100%',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '4px',
  },
  trust: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#9ca3af',
    marginTop: '12px',
  },
}

export default Hero