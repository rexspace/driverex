import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function BookCar() {
  const { carId } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const user = localStorage.getItem('name')
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch(`https://driverex-backend.onrender.com/cars/${carId}`)
      .then(res => res.json())
      .then(data => setCar(data))
  }, [carId])

  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 0
    const start = new Date(pickupDate)
    const end = new Date(returnDate)
    const diff = (end - start) / (1000 * 60 * 60 * 24)
    return diff > 0 ? diff : 0
  }

  const totalPrice = car ? calculateDays() * car.price : 0

  const handleBooking = async () => {
    if (!user || !token) {
      navigate('/login')
      return
    }
    if (!pickupDate || !returnDate) {
      setError('Please select pickup and return dates')
      return
    }
    if (calculateDays() <= 0) {
      setError('Return date must be after pickup date')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://driverex-backend.onrender.com/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          car_id: parseInt(carId),
          customer_name: user,
          customer_email: 'user@driverex.com',
          pickup_date: pickupDate,
          return_date: returnDate,
          total_price: totalPrice,
        })
      })
      if (response.ok) {
        setSuccess(true)
      } else {
        setError('Booking failed. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong')
    }
    setLoading(false)
  }

  if (success) return (
    <div style={styles.page}>
      <Navbar user={user} onLogout={() => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        navigate('/')
      }} />
      <div style={styles.successPage}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>🎉</div>
          <h2 style={styles.successTitle}>Booking Confirmed!</h2>
          <p style={styles.successSub}>
            Your {car?.name} is booked from {pickupDate} to {returnDate}.
          </p>
          <div style={styles.totalBox}>
            <span style={styles.totalLabel}>Total amount</span>
            <span style={styles.totalPrice}>₦{totalPrice.toLocaleString()}</span>
          </div>

          <p style={styles.paymentTitle}>Complete your payment</p>
          <p style={styles.paymentSub}>Choose how you want to pay</p>

          <button
            style={styles.whatsappBtn}
            onClick={() => {
              const message = `Hello DriveRex! 👋

I just made a booking and want to complete payment.

*Booking Details:*
🚗 Car: ${car?.name}
📅 Pickup: ${pickupDate}
📅 Return: ${returnDate}
💰 Total: ₦${totalPrice.toLocaleString()}
👤 Name: ${user}

Please confirm my booking. Thank you!`
              const encodedMessage = encodeURIComponent(message)
              window.open(`https://wa.me/2348163458818?text=${encodedMessage}`, '_blank')
            }}
          >
            <span style={styles.whatsappIcon}>💬</span>
            Pay via WhatsApp
          </button>

          <div style={styles.orDivider}>
            <div style={styles.orLine}></div>
            <span style={styles.orText}>or</span>
            <div style={styles.orLine}></div>
          </div>

          <button
            style={styles.paystackBtn}
            onClick={() => alert('Paystack coming soon!')}
          >
            💳 Pay Online with Paystack
          </button>

          <button style={styles.backBtn} onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )

  if (!car) return (
    <div style={styles.page}>
      <Navbar user={user} onLogout={() => navigate('/')} />
      <div style={styles.loadingPage}>
        <p style={styles.loadingText}>Loading car details...</p>
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
        <div style={styles.left}>
          <button style={styles.backBtn} onClick={() => navigate('/')}>
            ← Back to fleet
          </button>
          <h1 style={styles.heading}>Book your car</h1>
          <p style={styles.sub}>Fill in your rental details below</p>

          {!user && (
            <div style={styles.warning}>
              ⚠️ You need to <a href="/login" style={styles.warningLink}>sign in</a> to book a car
            </div>
          )}

          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.fieldGroup}>
            <div style={styles.field}>
              <label style={styles.label}>Pickup Date</label>
              <input
                style={styles.input}
                type="date"
                value={pickupDate}
                onChange={e => setPickupDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Return Date</label>
              <input
                style={styles.input}
                type="date"
                value={returnDate}
                onChange={e => setReturnDate(e.target.value)}
                min={pickupDate}
              />
            </div>
          </div>

          <button
            style={{...styles.btn, opacity: loading ? 0.7 : 1}}
            onClick={handleBooking}
            disabled={loading}
          >
            {loading ? 'Confirming...' : 'Confirm Booking'}
          </button>
        </div>

        <div style={styles.right}>
          <div style={styles.carCard}>
            <div style={styles.carImgBox}>
              {car.image_url ? (
                <img src={car.image_url} alt={car.name} style={styles.carImg} />
              ) : (
                <span style={styles.carEmoji}>{car.emoji}</span>
              )}
            </div>
            <div style={styles.carInfo}>
              <div style={styles.carBadge}>{car.badge}</div>
              <h2 style={styles.carName}>{car.name}</h2>
              <p style={styles.carType}>{car.type} · {car.seats} seats</p>
              <div style={styles.carFeatures}>
                <span style={styles.feature}>❄️ AC</span>
                <span style={styles.feature}>⛽ Petrol</span>
                <span style={styles.feature}>⭐ {car.rating}</span>
              </div>
            </div>
          </div>

          {calculateDays() > 0 && (
            <div style={styles.summary}>
              <h3 style={styles.summaryTitle}>Booking Summary</h3>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Duration</span>
                <span style={styles.summaryValue}>{calculateDays()} days</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Price per day</span>
                <span style={styles.summaryValue}>₦{car.price.toLocaleString()}</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Pickup</span>
                <span style={styles.summaryValue}>{pickupDate}</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Return</span>
                <span style={styles.summaryValue}>{returnDate}</span>
              </div>
              <div style={styles.summaryTotal}>
                <span>Total</span>
                <span>₦{totalPrice.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { backgroundColor: '#ffffff', minHeight: '100vh' },
  content: {
    display: 'flex',
    gap: '48px',
    padding: '48px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  left: { flex: 1 },
  right: { width: '340px' },
  backBtn: {
    background: 'transparent',
    border: 'none',
    color: '#6b7280',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '0',
    marginBottom: '24px',
    display: 'block',
  },
  heading: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#0a0a0a',
    letterSpacing: '-0.5px',
    marginBottom: '8px',
  },
  sub: {
    fontSize: '15px',
    color: '#6b7280',
    marginBottom: '32px',
  },
  warning: {
    background: '#fffbeb',
    border: '1px solid #fde68a',
    borderRadius: '10px',
    padding: '14px 16px',
    fontSize: '14px',
    color: '#92400e',
    marginBottom: '20px',
  },
  warningLink: { color: '#2563eb', fontWeight: '600' },
  error: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '10px',
    padding: '14px 16px',
    fontSize: '14px',
    color: '#dc2626',
    marginBottom: '20px',
  },
  fieldGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '24px',
  },
  field: {},
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
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
  btn: {
    width: '100%',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  carCard: {
    background: '#ffffff',
    border: '1.5px solid #f0f0f0',
    borderRadius: '16px',
    overflow: 'hidden',
    marginBottom: '20px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
  },
  carImgBox: {
    height: '200px',
    background: '#f9fafb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  carImg: { width: '100%', height: '100%', objectFit: 'cover' },
  carEmoji: { fontSize: '64px' },
  carInfo: { padding: '20px' },
  carBadge: {
    display: 'inline-block',
    background: '#eff6ff',
    color: '#2563eb',
    fontSize: '11px',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '100px',
    border: '1px solid #dbeafe',
    marginBottom: '10px',
  },
  carName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0a0a0a',
    marginBottom: '4px',
  },
  carType: {
    fontSize: '13px',
    color: '#9ca3af',
    marginBottom: '12px',
  },
  carFeatures: { display: 'flex', gap: '8px' },
  feature: {
    fontSize: '12px',
    color: '#6b7280',
    background: '#f9fafb',
    padding: '4px 10px',
    borderRadius: '6px',
    border: '1px solid #f0f0f0',
  },
  summary: {
    background: '#f9fafb',
    border: '1.5px solid #f0f0f0',
    borderRadius: '16px',
    padding: '24px',
  },
  summaryTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0a0a0a',
    marginBottom: '16px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  summaryLabel: { fontSize: '14px', color: '#6b7280' },
  summaryValue: { fontSize: '14px', color: '#374151', fontWeight: '500' },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    fontWeight: '800',
    color: '#0a0a0a',
    borderTop: '1.5px solid #e5e7eb',
    paddingTop: '12px',
    marginTop: '8px',
  },
  loadingPage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
  },
  loadingText: { fontSize: '16px', color: '#6b7280' },
  successPage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    padding: '48px',
  },
  successCard: {
    background: '#ffffff',
    border: '1.5px solid #f0f0f0',
    borderRadius: '20px',
    padding: '48px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
  },
  successIcon: { fontSize: '56px', marginBottom: '20px' },
  successTitle: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#0a0a0a',
    marginBottom: '12px',
  },
  successSub: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.6',
    marginBottom: '24px',
  },
  totalBox: {
    background: '#eff6ff',
    border: '1px solid #dbeafe',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: { fontSize: '13px', color: '#6b7280' },
  totalPrice: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#2563eb',
  },
  paymentTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0a0a0a',
    marginBottom: '4px',
    textAlign: 'center',
  },
  paymentSub: {
    fontSize: '13px',
    color: '#6b7280',
    marginBottom: '20px',
    textAlign: 'center',
  },
  whatsappBtn: {
    width: '100%',
    background: '#25D366',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  whatsappIcon: { fontSize: '18px' },
  orDivider: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  orLine: {
    flex: 1,
    height: '1px',
    background: '#f0f0f0',
  },
  orText: {
    fontSize: '12px',
    color: '#9ca3af',
    fontWeight: '500',
  },
  paystackBtn: {
    width: '100%',
    background: '#f9fafb',
    color: '#374151',
    border: '1.5px solid #e5e7eb',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '16px',
  },
}

export default BookCar