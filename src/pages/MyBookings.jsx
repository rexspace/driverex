import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const user = localStorage.getItem('name')
  const email = localStorage.getItem('email')

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (!email) { setLoading(false); return }
    fetch(`https://driverex-backend.onrender.com/my-bookings?email=${email}`)
      .then(res => res.json())
      .then(data => {
        setBookings(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return { bg: '#d1fae5', color: '#065f46' }
      case 'completed': return { bg: '#e0e7ff', color: '#3730a3' }
      case 'cancelled': return { bg: '#fee2e2', color: '#991b1b' }
      default: return { bg: '#fef3c7', color: '#92400e' }
    }
  }

  return (
    <div style={styles.page}>
      <Navbar user={user} onLogout={() => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        navigate('/')
      }} />

      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Bookings</h1>
          <p style={styles.sub}>Track all your car rental bookings</p>
        </div>

        {loading ? (
          <div style={styles.center}>
            <div style={styles.spinner}></div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : bookings.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>🚗</div>
            <h3 style={styles.emptyTitle}>No bookings yet</h3>
            <p style={styles.emptySub}>You haven't made any bookings yet. Browse our fleet and book your first car!</p>
            <button style={styles.browseBtn} onClick={() => navigate('/')}>
              Browse fleet →
            </button>
          </div>
        ) : (
          <div style={styles.bookingsList}>
            {bookings.map(booking => {
              const statusStyle = getStatusColor(booking.status)
              const days = Math.ceil(
                (new Date(booking.return_date) - new Date(booking.pickup_date)) 
                / (1000 * 60 * 60 * 24)
              )
              return (
                <div key={booking.id} style={styles.bookingCard}>
                  <div style={styles.cardLeft}>
                    <div style={styles.carImgBox}>
                      {booking.car_image ? (
                        <img src={booking.car_image} alt={booking.car_name} style={styles.carImg} />
                      ) : (
                        <span style={styles.carEmoji}>{booking.car_emoji}</span>
                      )}
                    </div>
                  </div>
                  <div style={styles.cardMiddle}>
                    <div style={styles.cardTop}>
                      <h3 style={styles.carName}>{booking.car_name}</h3>
                      <span style={{
                        ...styles.statusBadge,
                        background: statusStyle.bg,
                        color: statusStyle.color,
                      }}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <div style={styles.dateRow}>
                      <div style={styles.dateBox}>
                        <div style={styles.dateLabel}>Pickup</div>
                        <div style={styles.dateValue}>{booking.pickup_date}</div>
                      </div>
                      <div style={styles.dateSeparator}>→</div>
                      <div style={styles.dateBox}>
                        <div style={styles.dateLabel}>Return</div>
                        <div style={styles.dateValue}>{booking.return_date}</div>
                      </div>
                      <div style={styles.dateBox}>
                        <div style={styles.dateLabel}>Duration</div>
                        <div style={styles.dateValue}>{days} day{days !== 1 ? 's' : ''}</div>
                      </div>
                    </div>
                  </div>
                  <div style={styles.cardRight}>
                    <div style={styles.price}>₦{booking.total_price.toLocaleString()}</div>
                    <div style={styles.priceLabel}>Total paid</div>
                    {booking.status === 'pending' && (
                      <button
                        style={styles.whatsappBtn}
                        onClick={() => {
                          const message = `Hello DriveRex! I want to confirm payment for my booking.\n\n🚗 Car: ${booking.car_name}\n📅 Pickup: ${booking.pickup_date}\n📅 Return: ${booking.return_date}\n💰 Total: ₦${booking.total_price.toLocaleString()}\n\nPlease confirm. Thank you!`
                          window.open(`https://wa.me/2348163458818?text=${encodeURIComponent(message)}`, '_blank')
                        }}
                      >
                        💬 Pay via WhatsApp
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

const styles = {
  page: { backgroundColor: '#ffffff', minHeight: '100vh' },
  content: { maxWidth: '900px', margin: '0 auto', padding: '48px' },
  header: { marginBottom: '40px' },
  title: { fontSize: '32px', fontWeight: '800', color: '#0a0a0a', letterSpacing: '-0.5px', marginBottom: '8px' },
  sub: { fontSize: '15px', color: '#6b7280' },
  center: { display: 'flex', justifyContent: 'center', padding: '80px 0' },
  spinner: { width: '40px', height: '40px', border: '3px solid #e5e7eb', borderTop: '3px solid #2563eb', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  empty: { textAlign: 'center', padding: '80px 20px' },
  emptyIcon: { fontSize: '64px', marginBottom: '16px' },
  emptyTitle: { fontSize: '22px', fontWeight: '700', color: '#0a0a0a', marginBottom: '8px' },
  emptySub: { fontSize: '15px', color: '#6b7280', marginBottom: '28px', maxWidth: '400px', margin: '0 auto 28px' },
  browseBtn: { background: '#2563eb', color: 'white', border: 'none', padding: '13px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
  bookingsList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  bookingCard: {
    display: 'flex',
    gap: '20px',
    background: 'white',
    border: '1.5px solid #f0f0f0',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    alignItems: 'center',
  },
  cardLeft: { flexShrink: 0 },
  carImgBox: { width: '100px', height: '80px', borderRadius: '10px', overflow: 'hidden', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  carImg: { width: '100%', height: '100%', objectFit: 'cover' },
  carEmoji: { fontSize: '36px' },
  cardMiddle: { flex: 1 },
  cardTop: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' },
  carName: { fontSize: '16px', fontWeight: '700', color: '#0a0a0a' },
  statusBadge: { padding: '4px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: '600' },
  dateRow: { display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' },
  dateBox: {},
  dateLabel: { fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' },
  dateValue: { fontSize: '14px', fontWeight: '600', color: '#374151' },
  dateSeparator: { color: '#9ca3af', fontSize: '16px' },
  cardRight: { textAlign: 'right', flexShrink: 0 },
  price: { fontSize: '20px', fontWeight: '800', color: '#0a0a0a', marginBottom: '2px' },
  priceLabel: { fontSize: '12px', color: '#9ca3af', marginBottom: '12px' },
  whatsappBtn: { background: '#25D366', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' },
}

export default MyBookings