import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function CarDetail() {
  const { carId } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = localStorage.getItem('name')

  useEffect(() => {
    fetch(`https://driverex-backend.onrender.com/cars/${carId}`)
      .then(res => res.json())
      .then(data => {
        setCar(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [carId])

  if (loading) return (
    <div style={styles.page}>
      <Navbar user={user} onLogout={() => { localStorage.removeItem('token'); localStorage.removeItem('name'); navigate('/') }} />
      <div style={styles.center}>
        <div style={styles.spinner}></div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )

  if (!car) return (
    <div style={styles.page}>
      <Navbar user={user} onLogout={() => navigate('/')} />
      <div style={styles.center}>
        <p>Car not found</p>
      </div>
    </div>
  )

  return (
    <div style={styles.page}>
      <Navbar user={user} onLogout={() => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        navigate('/')
      }} />

      <div style={styles.content}>
        <button style={styles.backBtn} onClick={() => navigate('/')}>
          ← Back to fleet
        </button>

        <div style={styles.grid}>
          {/* Left — Images & Details */}
          <div style={styles.left}>
            <div style={styles.imgBox}>
              {car.image_url ? (
                <img src={car.image_url} alt={car.name} style={styles.img} />
              ) : (
                <span style={styles.emoji}>{car.emoji}</span>
              )}
              <div style={styles.badge}>{car.badge}</div>
            </div>

            <div style={styles.specs}>
              <h3 style={styles.specsTitle}>Car Specifications</h3>
              <div style={styles.specsGrid}>
                <div style={styles.specItem}>
                  <div style={styles.specIcon}>👤</div>
                  <div style={styles.specLabel}>Passengers</div>
                  <div style={styles.specValue}>{car.seats} seats</div>
                </div>
                <div style={styles.specItem}>
                  <div style={styles.specIcon}>⚙️</div>
                  <div style={styles.specLabel}>Transmission</div>
                  <div style={styles.specValue}>Automatic</div>
                </div>
                <div style={styles.specItem}>
                  <div style={styles.specIcon}>⛽</div>
                  <div style={styles.specLabel}>Fuel Type</div>
                  <div style={styles.specValue}>Petrol</div>
                </div>
                <div style={styles.specItem}>
                  <div style={styles.specIcon}>❄️</div>
                  <div style={styles.specLabel}>Air Conditioning</div>
                  <div style={styles.specValue}>Yes</div>
                </div>
                <div style={styles.specItem}>
                  <div style={styles.specIcon}>⭐</div>
                  <div style={styles.specLabel}>Rating</div>
                  <div style={styles.specValue}>{car.rating}/5.0</div>
                </div>
                <div style={styles.specItem}>
                  <div style={styles.specIcon}>🚗</div>
                  <div style={styles.specLabel}>Total Trips</div>
                  <div style={styles.specValue}>{car.trips} trips</div>
                </div>
              </div>
            </div>

            <div style={styles.features}>
              <h3 style={styles.specsTitle}>What's included</h3>
              {[
                '✅ Comprehensive insurance coverage',
                '✅ 24/7 roadside assistance',
                '✅ Free cancellation 24hrs before pickup',
                '✅ Unlimited mileage within Nigeria',
                '✅ Full tank of fuel on pickup',
                '✅ Clean and sanitized vehicle',
              ].map((feature, i) => (
                <div key={i} style={styles.featureItem}>{feature}</div>
              ))}
            </div>
          </div>

          {/* Right — Booking Card */}
          <div style={styles.right}>
            <div style={styles.bookingCard}>
              <div style={styles.carHeader}>
                <h1 style={styles.carName}>{car.name}</h1>
                <p style={styles.carType}>{car.type} · {car.seats} seats</p>
              </div>

              <div style={styles.ratingRow}>
                <div style={styles.stars}>
                  {'★'.repeat(Math.floor(car.rating))}{'☆'.repeat(5 - Math.floor(car.rating))}
                </div>
                <span style={styles.ratingText}>{car.rating} ({car.trips} trips)</span>
              </div>

              <div style={styles.priceBox}>
                <span style={styles.price}>₦{car.price.toLocaleString()}</span>
                <span style={styles.perDay}>/day</span>
              </div>

              <div style={styles.divider}></div>

              <div style={styles.highlights}>
                <div style={styles.highlight}>
                  <span style={styles.highlightIcon}>⚡</span>
                  <span style={styles.highlightText}>Instant booking</span>
                </div>
                <div style={styles.highlight}>
                  <span style={styles.highlightIcon}>🛡️</span>
                  <span style={styles.highlightText}>Fully insured</span>
                </div>
                <div style={styles.highlight}>
                  <span style={styles.highlightIcon}>📍</span>
                  <span style={styles.highlightText}>Free pickup in Abuja & Lagos</span>
                </div>
              </div>

              <button
                style={styles.bookBtn}
                onMouseEnter={e => e.target.style.background = '#1d4ed8'}
                onMouseLeave={e => e.target.style.background = '#2563eb'}
                onClick={() => {
                  if (!user) {
                    navigate('/login')
                  } else {
                    navigate(`/book/${car.id}`)
                  }
                }}
              >
                {user ? 'Book this car →' : 'Sign in to book →'}
              </button>

              {!user && (
                <p style={styles.signupNote}>
                  Don't have an account?{' '}
                  <span style={styles.signupLink} onClick={() => navigate('/signup')}>
                    Sign up free
                  </span>
                </p>
              )}

              <div style={styles.trustRow}>
                <span style={styles.trustItem}>🔒 Secure booking</span>
                <span style={styles.trustItem}>💳 Pay later</span>
                <span style={styles.trustItem}>✅ Free cancel</span>
              </div>
            </div>

            <div style={styles.infoCard}>
              <h3 style={styles.infoTitle}>Need help?</h3>
              <p style={styles.infoText}>Our team is available 24/7 to assist you with any questions.</p>
              <button
                style={styles.whatsappBtn}
                onClick={() => window.open('https://wa.me/2348163458818?text=Hello DriveRex! I need help with a booking.', '_blank')}
              >
                💬 Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const styles = {
  page: { backgroundColor: '#ffffff', minHeight: '100vh' },
  content: { maxWidth: '1100px', margin: '0 auto', padding: '40px 48px' },
  center: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' },
  spinner: { width: '40px', height: '40px', border: '3px solid #e5e7eb', borderTop: '3px solid #2563eb', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  backBtn: { background: 'transparent', border: 'none', color: '#6b7280', fontSize: '14px', cursor: 'pointer', padding: '0', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '4px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', alignItems: 'start' },
  left: {},
  right: { position: 'sticky', top: '100px' },
  imgBox: {
    position: 'relative',
    height: '360px',
    borderRadius: '20px',
    overflow: 'hidden',
    background: '#f9fafb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '32px',
    border: '1.5px solid #f0f0f0',
  },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  emoji: { fontSize: '96px' },
  badge: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    background: '#eff6ff',
    color: '#2563eb',
    border: '1px solid #dbeafe',
    borderRadius: '100px',
    padding: '6px 14px',
    fontSize: '13px',
    fontWeight: '600',
  },
  specs: { background: '#f9fafb', border: '1.5px solid #f0f0f0', borderRadius: '16px', padding: '24px', marginBottom: '24px' },
  specsTitle: { fontSize: '16px', fontWeight: '700', color: '#0a0a0a', marginBottom: '20px' },
  specsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
  specItem: { textAlign: 'center', padding: '16px', background: 'white', borderRadius: '12px', border: '1px solid #f0f0f0' },
  specIcon: { fontSize: '24px', marginBottom: '8px' },
  specLabel: { fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' },
  specValue: { fontSize: '14px', fontWeight: '600', color: '#374151' },
  features: { background: '#f9fafb', border: '1.5px solid #f0f0f0', borderRadius: '16px', padding: '24px' },
  featureItem: { fontSize: '14px', color: '#374151', padding: '8px 0', borderBottom: '1px solid #f0f0f0' },
  bookingCard: { background: 'white', border: '1.5px solid #f0f0f0', borderRadius: '20px', padding: '28px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', marginBottom: '16px' },
  carHeader: { marginBottom: '12px' },
  carName: { fontSize: '22px', fontWeight: '800', color: '#0a0a0a', marginBottom: '4px', letterSpacing: '-0.5px' },
  carType: { fontSize: '14px', color: '#9ca3af' },
  ratingRow: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' },
  stars: { color: '#f59e0b', fontSize: '16px' },
  ratingText: { fontSize: '13px', color: '#6b7280' },
  priceBox: { marginBottom: '20px' },
  price: { fontSize: '32px', fontWeight: '800', color: '#0a0a0a' },
  perDay: { fontSize: '15px', color: '#9ca3af', marginLeft: '4px' },
  divider: { height: '1px', background: '#f0f0f0', marginBottom: '20px' },
  highlights: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' },
  highlight: { display: 'flex', alignItems: 'center', gap: '10px' },
  highlightIcon: { fontSize: '16px' },
  highlightText: { fontSize: '14px', color: '#374151' },
  bookBtn: { width: '100%', background: '#2563eb', color: 'white', border: 'none', padding: '15px', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px', transition: 'background 0.2s' },
  signupNote: { fontSize: '13px', color: '#6b7280', textAlign: 'center', marginBottom: '16px' },
  signupLink: { color: '#2563eb', fontWeight: '600', cursor: 'pointer' },
  trustRow: { display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #f0f0f0' },
  trustItem: { fontSize: '12px', color: '#6b7280' },
  infoCard: { background: '#f9fafb', border: '1.5px solid #f0f0f0', borderRadius: '16px', padding: '20px' },
  infoTitle: { fontSize: '15px', fontWeight: '700', color: '#0a0a0a', marginBottom: '8px' },
  infoText: { fontSize: '13px', color: '#6b7280', lineHeight: '1.6', marginBottom: '14px' },
  whatsappBtn: { width: '100%', background: '#25D366', color: 'white', border: 'none', padding: '11px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
}

export default CarDetail