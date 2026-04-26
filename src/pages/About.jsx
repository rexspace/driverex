function About() {
    return (
      <div style={styles.page}>
        <div style={styles.hero}>
          <div style={styles.badge}>🇳🇬 A Nigerian Brand</div>
          <h1 style={styles.heading}>We're building the future of <span style={styles.accent}>car rental</span> in Nigeria</h1>
          <p style={styles.sub}>DriveRex was founded in Abuja with one mission — make renting a car as easy as ordering food online.</p>
        </div>
  
        <div style={styles.section}>
          <div style={styles.grid}>
            <div style={styles.card}>
              <div style={styles.icon}>🎯</div>
              <h3 style={styles.cardTitle}>Our Mission</h3>
              <p style={styles.cardText}>To make premium car rental accessible to every Nigerian — whether you're a business traveller, a family on a road trip, or just need a ride for the weekend.</p>
            </div>
            <div style={styles.card}>
              <div style={styles.icon}>👁️</div>
              <h3 style={styles.cardTitle}>Our Vision</h3>
              <p style={styles.cardText}>To become Nigeria's most trusted car rental platform — known for transparency, reliability and world-class service.</p>
            </div>
            <div style={styles.card}>
              <div style={styles.icon}>💎</div>
              <h3 style={styles.cardTitle}>Our Values</h3>
              <p style={styles.cardText}>Honesty, reliability and customer first. No hidden fees, no surprises. Just a great car and a great experience every time.</p>
            </div>
          </div>
        </div>
  
        <div style={styles.statsSection}>
          <div style={styles.stat}>
            <div style={styles.statNum}>48+</div>
            <div style={styles.statLabel}>Cars in fleet</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNum}>2,000+</div>
            <div style={styles.statLabel}>Happy customers</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNum}>2</div>
            <div style={styles.statLabel}>Cities covered</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNum}>4.9★</div>
            <div style={styles.statLabel}>Average rating</div>
          </div>
        </div>
  
        <div style={styles.teamSection}>
          <h2 style={styles.sectionTitle}>Built by Nigerians, for Nigerians</h2>
          <p style={styles.sectionSub}>DriveRex is proudly founded and operated in Abuja, FCT. We understand Nigerian roads, Nigerian customers and Nigerian needs better than anyone.</p>
          <button style={styles.btn} onClick={() => window.location.href='/'}>
  Browse our fleet →
</button>
        </div>
      </div>
    )
  }
  
  const styles = {
    page: { backgroundColor: '#ffffff', minHeight: '100vh' },
    hero: {
      padding: '80px 48px',
      background: '#f9fafb',
      borderBottom: '1px solid #f0f0f0',
      maxWidth: '700px',
      margin: '0 auto',
      textAlign: 'center',
    },
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
      fontSize: '42px',
      fontWeight: '800',
      color: '#0a0a0a',
      lineHeight: '1.1',
      letterSpacing: '-1px',
      marginBottom: '20px',
    },
    accent: { color: '#2563eb' },
    sub: {
      fontSize: '16px',
      color: '#6b7280',
      lineHeight: '1.7',
    },
    section: { padding: '64px 48px' },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
      maxWidth: '900px',
      margin: '0 auto',
    },
    card: {
      background: '#f9fafb',
      border: '1.5px solid #f0f0f0',
      borderRadius: '16px',
      padding: '28px',
    },
    icon: { fontSize: '32px', marginBottom: '16px' },
    cardTitle: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#0a0a0a',
      marginBottom: '10px',
    },
    cardText: {
      fontSize: '14px',
      color: '#6b7280',
      lineHeight: '1.7',
    },
    statsSection: {
      display: 'flex',
      justifyContent: 'center',
      gap: '64px',
      padding: '48px',
      background: '#0a0a0a',
    },
    stat: { textAlign: 'center' },
    statNum: {
      fontSize: '36px',
      fontWeight: '800',
      color: '#ffffff',
      marginBottom: '4px',
    },
    statLabel: { fontSize: '13px', color: '#6b7280' },
    teamSection: {
      padding: '80px 48px',
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto',
    },
    sectionTitle: {
      fontSize: '28px',
      fontWeight: '800',
      color: '#0a0a0a',
      marginBottom: '16px',
      letterSpacing: '-0.5px',
    },
    sectionSub: {
      fontSize: '15px',
      color: '#6b7280',
      lineHeight: '1.7',
      marginBottom: '32px',
    },
    btn: {
      background: '#2563eb',
      color: 'white',
      border: 'none',
      padding: '14px 28px',
      borderRadius: '10px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
    },
  }
  
  export default About