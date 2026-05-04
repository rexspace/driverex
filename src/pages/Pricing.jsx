function Pricing() {
    const plans = [
      {
        name: 'Economy',
        price: '18,000/hr',
        desc: 'Perfect for daily commutes and short trips',
        color: '#f9fafb',
        features: ['Toyota Corolla or similar', 'Up to 5 passengers', 'Free cancellation 24hrs', 'Basic insurance included', 'Free pickup in Abuja'],
        popular: false,
      },
      {
        name: 'Standard',
        price: '35,000/hr',
        desc: 'Our most popular choice for business trips',
        color: '#2563eb',
        features: ['Toyota Camry or similar', 'Up to 5 passengers', 'Free cancellation 48hrs', 'Comprehensive insurance', 'Free pickup anywhere', 'Priority support'],
        popular: true,
      },
      {
        name: 'Premium',
        price: '85,000/hr',
        desc: 'Luxury vehicles for special occasions',
        color: '#0a0a0a',
        features: ['Mercedes, BMW or similar', 'Up to 7 passengers', 'Free cancellation anytime', 'Full insurance coverage', 'Free pickup & dropoff', '24/7 VIP support', 'Complimentary driver'],
        popular: false,
      },
    ]
  
    return (
      <div style={styles.page}>
        <div style={styles.hero}>
          <h1 style={styles.heading}>Simple, transparent <span style={styles.accent}>pricing</span></h1>
          <p style={styles.sub}>No hidden fees. No surprises. Just great cars at honest prices.</p>
        </div>
  
        <div style={styles.section}>
          <div style={styles.grid}>
            {plans.map(plan => (
              <div key={plan.name} style={{
                ...styles.card,
                background: plan.popular ? '#2563eb' : plan.color === '#0a0a0a' ? '#0a0a0a' : '#ffffff',
                border: plan.popular ? 'none' : '1.5px solid #f0f0f0',
              }}>
                {plan.popular && (
                  <div style={styles.popularBadge}>Most Popular ⭐</div>
                )}
                <h2 style={{...styles.planName, color: plan.popular || plan.color === '#0a0a0a' ? 'white' : '#0a0a0a'}}>
                  {plan.name}
                </h2>
                <div style={{...styles.planPrice, color: plan.popular || plan.color === '#0a0a0a' ? 'white' : '#0a0a0a'}}>
                  ₦{plan.price}<span style={styles.perDay}>/day</span>
                </div>
                <p style={{...styles.planDesc, color: plan.popular || plan.color === '#0a0a0a' ? 'rgba(255,255,255,0.7)' : '#6b7280'}}>
                  {plan.desc}
                </p>
                <ul style={styles.features}>
                  {plan.features.map(f => (
                    <li key={f} style={{...styles.feature, color: plan.popular || plan.color === '#0a0a0a' ? 'rgba(255,255,255,0.85)' : '#374151'}}>
                      ✓ {f}
                    </li>
                  ))}
                </ul>
                <button
  style={{
    ...styles.btn,
    background: plan.popular ? 'white' : '#2563eb',
    color: plan.popular ? '#2563eb' : 'white',
  }}
  onClick={() => window.location.href='/'}>
  Browse {plan.name} cars →
</button>
              </div>
            ))}
          </div>
  
          <div style={styles.note}>
            💡 Prices are per day. Minimum rental is 1 day. All prices include basic insurance.
            Contact us for weekly or monthly rates — we offer great discounts!
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
    },
    section: { padding: '64px 48px' },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
      maxWidth: '900px',
      margin: '0 auto 32px',
    },
    card: {
      borderRadius: '20px',
      padding: '32px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      position: 'relative',
    },
    popularBadge: {
      background: 'rgba(255,255,255,0.2)',
      color: 'white',
      fontSize: '12px',
      fontWeight: '600',
      padding: '4px 12px',
      borderRadius: '100px',
      display: 'inline-block',
      marginBottom: '16px',
    },
    planName: {
      fontSize: '20px',
      fontWeight: '800',
      marginBottom: '8px',
    },
    planPrice: {
      fontSize: '36px',
      fontWeight: '800',
      marginBottom: '8px',
      letterSpacing: '-1px',
    },
    perDay: {
      fontSize: '16px',
      fontWeight: '400',
      opacity: 0.7,
    },
    planDesc: {
      fontSize: '14px',
      lineHeight: '1.6',
      marginBottom: '24px',
    },
    features: {
      listStyle: 'none',
      marginBottom: '28px',
    },
    feature: {
      fontSize: '14px',
      marginBottom: '10px',
      lineHeight: '1.5',
    },
    btn: {
      width: '100%',
      border: 'none',
      padding: '13px',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    note: {
      textAlign: 'center',
      fontSize: '14px',
      color: '#6b7280',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      background: '#f9fafb',
      borderRadius: '12px',
      border: '1px solid #f0f0f0',
      lineHeight: '1.7',
    },
  }
  
  export default Pricing