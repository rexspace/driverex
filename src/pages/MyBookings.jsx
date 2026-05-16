import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const navigate = useNavigate()
  const user = localStorage.getItem('name')
  const email = localStorage.getItem('email')

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (!email) { setLoading(false); return }
    fetch(`https://driverex-backend.onrender.com/my-bookings?email=${email}`)
      .then(res => res.json())
      .then(data => {
        setBookings(Array.isArray(data) ? data : [])
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

  const filteredBookings = activeTab === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === activeTab)

  const totalSpent = bookings.reduce((sum, b) => sum + b.total_price, 0)
  const pendingCount = bookings.filter(b => b.status === 'pending').length
  const completedCount = bookings.filter(b => b.status === 'completed').length

  return (
    <div style={styles.page}>
      <Navbar user={user} onLogout={() => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        localStorage.removeItem('is_admin')
        navigate('/')
      }} />

      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>My Dashboard</h1>
            <p style={styles.sub}>Welcome back, {user}! 👋</p>
          </div>
          <button style={styles.bookBtn} onClick={() => navigate('/')}>
            + Book a car
          </button>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📋</div>
            <div style={styles.statNum}>{bookings.length}</div>
            <div style={styles.statLabel}>Total Bookings</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>⏳</div>
            <div style={styles.statNum}>{pendingCount}</div>
            <div style={styles.statLabel}>Pending</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>✅</div>
            <div style={styles.statNum}>{completedCount}</div>
            <div style={styles.statLabel}>Completed</div>
          </div>
          <div style={{...styles.statCard, ...styles.blueCard}}>
            <div style={styles.statIcon}>💰</div>
            <div style={{...styles.statNum, color: 'white'}}>
              ₦{totalSpent.toLocaleString()}
            </div>
            <div style={{...styles.statLabel, color: 'rgba(255,255,255,0.7)'}}>
              Total Spent
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          {['all', 'pending', 'confirmed', 'completed'].map(tab => (
            <button
              key={tab}
              style={{
                ...styles.tab,
                ...(activeTab === tab ? styles.tabActive : {})
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'pending' && pendingCount > 0 && (
                <span style={styles.tabBadge}>{pendingCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Bookings */}
        {loading ? (
          <div style={styles.center}>
            <div style={styles.spinner}></div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>🚗</div>
            <h3 style={styles.emptyTitle}>
              {activeTab === 'all' ? 'No bookings yet' : `No ${activeTab} bookings`}
            </h3>
            <p style={styles.emptySub}>
              {activeTab === 'all' 
                ? 'Browse our fleet and book your first car!'
                : `You have no ${activeTab} bookings at the moment.`}
            </p>
            {activeTab === 'all' && (
              <button style={styles.browseBtn} onClick={() => navigate('/')}>
                Browse fleet →
              </button>
            )}
          </div>
        ) : (
          <div style={styles.bookingsList}>
            {filteredBookings.map(booking => {
              const statusStyle = getStatusColor(booking.status)
              const days = Math.max(1, Math.ceil(
                (new Date(booking.return_date) - new Date(booking.pickup_date))
                / (1000 * 60 * 60 * 24)
              ))
              return (
                <div
                  key={booking.id}
                  style={styles.bookingCard}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'}
                >
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
                        <div style={styles.dateLabel}>📅 Pickup</div>
                        <div style={styles.dateValue}>{booking.pickup_date}</div>
                      </div>
                      <div style={styles.dateSeparator}>→</div>
                      <div style={styles.dateBox}>
                        <div style={styles.dateLabel}>📅 Return</div>
                        <div style={styles.dateValue}>{booking.return_date}</div>
                      </div>
                      <div style={styles.dateBox}>
                        <div style={styles.dateLabel}>⏱ Duration</div>
                        <div style={styles.dateValue}>{days} day{days !== 1 ? 's' : ''}</div>
                      </div>
                    </div>
                  </div>
                  <div style={styles.cardRight}>
                    <div style={styles.price}>₦{booking.total_price.toLocaleString()}</div>
                    <div style={styles.priceLabel}>Total</div>
                    {booking.status === 'pending' && (
                      <button
                        style={styles.whatsappBtn}
                        onClick={() => {
                          const message = `Hello DriveRex! I want to confirm payment for my booking.\n\n🚗 Car: ${booking.car_name}\n📅 Pickup: ${booking.pickup_date}\n📅 Return: ${booking.return_date}\n💰 Total: ₦${booking.total_price.toLocaleString()}\n\nPlease confirm. Thank you!`
                          window.open(`https://wa.me/2348163458818?text=${encodeURIComponent(message)}`, '_blank')
                        }}
                      >
                        💬 Pay Now
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
  page: { backgroundColor: '#f9fafb', minHeight: '100vh' },
  content: { maxWidth: '900px', margin: '0 auto', padding: '48px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' },
  title: { fontSize: '28px', fontWeight: '800', color: '#0a0a0a', letterSpacing: '-0.5px', marginBottom: '4px' },
  sub: { fontSize: '15px', color: '#6b7280' },
  bookBtn: { background: '#2563eb', color: 'white', border: 'none', padding: '11px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' },
  statCard: { background: 'white', border: '1.5px solid #f0f0f0', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  blueCard: { background: '#2563eb', border: 'none' },
  statIcon: { fontSize: '24px', marginBottom: '8px' },
  statNum: { fontSize: '24px', fontWeight: '800', color: '#0a0a0a', marginBottom: '4px' },
  statLabel: { fontSize: '13px', color: '#6b7280' },
  tabs: { display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' },
  tab: { padding: '8px 18px', borderRadius: '100px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', border: '1.5px solid #e5e7eb', background: 'white', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px' },
  tabActive: { background: '#2563eb', color: 'white', border: '1.5px solid #2563eb' },
  tabBadge: { background: '#ef4444', color: 'white', borderRadius: '100px', padding: '1px 6px', fontSize: '11px', fontWeight: '700' },
  center: { display: 'flex', justifyContent: 'center', padding: '80px 0' },
  spinner: { width: '40px', height: '40px', border: '3px solid #e5e7eb', borderTop: '3px solid #2563eb', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  empty: { textAlign: 'center', padding: '80px 20px', background: 'white', borderRadius: '16px', border: '1.5px solid #f0f0f0' },
  emptyIcon: { fontSize: '56px', marginBottom: '16px' },
  emptyTitle: { fontSize: '20px', fontWeight: '700', color: '#0a0a0a', marginBottom: '8px' },
  emptySub: { fontSize: '14px', color: '#6b7280', marginBottom: '24px' },
  browseBtn: { background: '#2563eb', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  bookingsList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  bookingCard: { display: 'flex', gap: '20px', background: 'white', border: '1.5px solid #f0f0f0', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', alignItems: 'center', transition: 'box-shadow 0.2s', cursor: 'default' },
  cardLeft: { flexShrink: 0 },
  carImgBox: { width: '100px', height: '80px', borderRadius: '10px', overflow: 'hidden', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  carImg: { width: '100%', height: '100%', objectFit: 'cover' },
  carEmoji: { fontSize: '36px' },
  cardMiddle: { flex: 1 },
  cardTop: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' },
  carName: { fontSize: '16px', fontWeight: '700', color: '#0a0a0a' },
  statusBadge: { padding: '4px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: '600' },
  dateRow: { display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' },
  dateBox: {},
  dateLabel: { fontSize: '11px', color: '#9ca3af', marginBottom: '2px' },
  dateValue: { fontSize: '13px', fontWeight: '600', color: '#374151' },
  dateSeparator: { color: '#9ca3af', fontSize: '16px' },
  cardRight: { textAlign: 'right', flexShrink: 0 },
  price: { fontSize: '18px', fontWeight: '800', color: '#0a0a0a', marginBottom: '2px' },
  priceLabel: { fontSize: '12px', color: '#9ca3af', marginBottom: '10px' },
  whatsappBtn: { background: '#25D366', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' },
}

export default MyBookings