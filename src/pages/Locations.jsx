function Locations() {
    const locations = [
      {
        city: 'Abuja',
        address: 'Plot 123, Wuse Zone 4, Abuja FCT',
        phone: '+234 801 234 5678',
        hours: 'Mon - Sat: 7AM - 9PM',
        emoji: '🏛️',
        cars: 28,
      },
      {
        city: 'Lagos',
        address: '45 Admiralty Way, Lekki Phase 1, Lagos',
        phone: '+234 802 345 6789',
        hours: 'Mon - Sun: 6AM - 10PM',
        emoji: '🌊',
        cars: 20,
      },
    ]
  
    return (
      <div style={styles.page}>
        <div style={styles.hero}>
          <h1 style={styles.heading}>Our <span style={styles.accent}>Locations</span></h1>
          <p style={styles.sub}>Pick up your car at any of our locations across Nigeria. More cities coming soon!</p>
        </div>
  
        <div style={styles.section}>
          <div style={styles.grid}>
            {locations.map(loc => (
              <div key={loc.city} style={styles.card}>
                <div style={styles.cityEmoji}>{loc.emoji}</div>
                <h2 style={styles.city}>{loc.city}</h2>
                <div style={styles.infoRow}>
                  <span style={styles.infoIcon}>📍</span>
                  <span style={styles.infoText}>{loc.address}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoIcon}>📞</span>
                  <span style={styles.infoText}>{loc.phone}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoIcon}>🕐</span>
                  <span style={styles.infoText}>{loc.hours}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoIcon}>🚗</span>
                  <span style={styles.infoText}>{loc.cars} cars available</span>
                </div>
                <button style={styles.btn} onClick={() => window.location.href='/'}>
  Browse cars →
</button>
              </div>
            ))}
          </div>
  
          <div style={styles.comingSoon}>
            <h3 style={styles.comingTitle}>Coming soon 🚀</h3>
            <div style={styles.cities}>
              {['Port Harcourt', 'Kano', 'Ibadan', 'Enugu'].map(city => (
                <div key={city} style={styles.cityPill}>{city}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  const styles = {
    page: { backgroundColor: '#ffffff', minHeight: '100vh' },
    hero: {
      padding: '80px 48px 48px',
      textAlign: 'center',
      background: '#f9fafb',
      borderBottom: '1px solid #f0f0f0',
    },
    heading: {
      fontSize: '42px',
      fontWeight: '800',
      color: '#0a0a0a',
      letterSpacing: '-1px',
      marginBottom: '16px',
    },
    accent: { color: '#2563eb' },
    sub: {
      fontSize: '16px',
      color: '#6b7280',
      lineHeight: '1.7',
      maxWidth: '500px',
      margin: '0 auto',
    },
    section: { padding: '64px 48px' },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
      maxWidth: '800px',
      margin: '0 auto 48px',
    },
    card: {
      background: '#ffffff',
      border: '1.5px solid #f0f0f0',
      borderRadius: '20px',
      padding: '32px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
    },
    cityEmoji: { fontSize: '40px', marginBottom: '12px' },
    city: {
      fontSize: '24px',
      fontWeight: '800',
      color: '#0a0a0a',
      marginBottom: '20px',
      letterSpacing: '-0.5px',
    },
    infoRow: {
      display: 'flex',
      gap: '10px',
      marginBottom: '12px',
      alignItems: 'flex-start',
    },
    infoIcon: { fontSize: '14px', marginTop: '2px' },
    infoText: { fontSize: '14px', color: '#6b7280', lineHeight: '1.5' },
    btn: {
      background: '#2563eb',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '20px',
      width: '100%',
    },
    comingSoon: {
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '32px',
      background: '#f9fafb',
      borderRadius: '16px',
      border: '1.5px solid #f0f0f0',
    },
    comingTitle: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#0a0a0a',
      marginBottom: '16px',
    },
    cities: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' },
    cityPill: {
      background: '#ffffff',
      border: '1.5px solid #e5e7eb',
      borderRadius: '100px',
      padding: '8px 18px',
      fontSize: '14px',
      color: '#6b7280',
      fontWeight: '500',
    },
  }
  
  export default Locations