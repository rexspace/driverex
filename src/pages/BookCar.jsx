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
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    phone_number: '',
    home_address: '',
    city: '',
    state: '',

    has_license: false,
    license_number: '',
    license_expiry: '',

    needs_driver: false,

    nin: '',

    emergency_contact_name: '',
    emergency_contact_phone: '',
  })
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }
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
        
          phone_number: formData.phone_number,
          home_address: formData.home_address,
          state: formData.state,
        
          has_license: formData.has_license,
          license_number: formData.license_number,
          license_expiry: formData.license_expiry,
        
          needs_driver: formData.needs_driver,
        
          emergency_contact_name:
            formData.emergency_contact_name,
        
          emergency_contact_phone:
            formData.emergency_contact_phone,
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
          <h2 style={styles.successTitle}>
  Booking Request Submitted
</h2>
<p style={styles.successSub}>
  Your booking request for the {car?.name}
  has been submitted successfully.

  Our team will review your information
  and contact you shortly to confirm
  availability and payment.
</p>
          <div style={styles.totalBox}>
            <span style={styles.totalLabel}>Total amount</span>
            <span style={styles.totalPrice}>₦{totalPrice.toLocaleString()}</span>
          </div>
          <div style={styles.statusBox}>
  <span style={styles.statusBadge}>
    Pending Review
  </span>

  <p style={styles.statusText}>
    Your booking is currently under review.
    Please complete payment via WhatsApp
    to secure your reservation.
  </p>
</div>
          <p style={styles.paymentTitle}>Complete your payment</p>
          <p style={styles.paymentSub}>Choose how you want to pay</p>

          <button
            style={styles.whatsappBtn}
            onClick={() => {
              const message = `Hello Driverex! 👋

              I just submitted a booking request.
              
              *Customer Information*
              👤 Name: ${user}
              📞 Phone: ${formData.phone_number}
              📍 State: ${formData.state}
              
              *Rental Details*
              🚗 Car: ${car?.name}
              📅 Pickup: ${pickupDate}
              📅 Return: ${returnDate}
              💰 Total: ₦${totalPrice.toLocaleString()}
              
              *Driver Information*
              🪪 Has License: ${formData.has_license ? 'Yes' : 'No'}
              🚘 Needs Driver: ${formData.needs_driver ? 'Yes' : 'No'}
              
              Please confirm availability and payment details.
              Thank you!`
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
          <div style={styles.stepIndicator}>
  Step {step} of 5
</div>
          {step === 1 && (
  <>
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
      style={styles.btn}
      onClick={() => setStep(2)}
    >
      Continue
    </button>
  </>
)}
    {step === 2 && (
  <>
    <div style={styles.fieldGroup}>
      <div style={styles.field}>
        <label style={styles.label}>Phone Number</label>
        <input
          style={styles.input}
          type="text"
          placeholder="08012345678"
          value={formData.phone_number}
          onChange={(e) =>
            updateFormData('phone_number', e.target.value)
          }
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>State</label>
        <select
  style={styles.input}
  value={formData.state}
  onChange={(e) =>
    updateFormData('state', e.target.value)
  }
>
  <option value="">Select State</option>

  <option value="Lagos">Lagos</option>
  <option value="Abuja">Abuja (FCT)</option>
  <option value="Rivers">Rivers</option>
  <option value="Ogun">Ogun</option>
  <option value="Oyo">Oyo</option>
  <option value="Kano">Kano</option>
  <option value="Kaduna">Kaduna</option>
  <option value="Enugu">Enugu</option>
  <option value="Delta">Delta</option>
  <option value="Anambra">Anambra</option>
  <option value="Edo">Edo</option>
  <option value="Akwa Ibom">Akwa Ibom</option>
  <option value="Borno">Borno</option>
  <option value="Osun">Osun</option>
  <option value="Ondo">Ondo</option>
  <option value="Cross River">Cross River</option>
  <option value="Abia">Abia</option>
</select>
      </div>
    </div>

    <div style={styles.field}>
      <label style={styles.label}>Home Address</label>
      <input
        style={styles.input}
        type="text"
        placeholder="Enter your address"
        value={formData.home_address}
        onChange={(e) =>
          updateFormData('home_address', e.target.value)
        }
      />
    </div>

    <div style={styles.buttonRow}>
      <button
        style={styles.secondaryBtn}
        onClick={() => setStep(1)}
      >
        Back
      </button>

      <button
        style={styles.btn}
        onClick={() => setStep(3)}
      >
        Continue
      </button>
    </div>
  </>
)}
{step === 3 && (
  <>
    <div style={{ marginBottom: '24px' }}>
      <label style={styles.label}>
        Do you have a valid driver's license?
      </label>

      <div style={styles.radioGroup}>
        <button
          type="button"
          style={{
            ...styles.optionBtn,
            background: formData.has_license ? '#2563eb' : '#f9fafb',
            color: formData.has_license ? '#fff' : '#374151',
          }}
          onClick={() => {
            updateFormData('has_license', true)
            updateFormData('needs_driver', false)
          }}
        >
          Yes, I have a license
        </button>

        <button
          type="button"
          style={{
            ...styles.optionBtn,
            background: !formData.has_license ? '#2563eb' : '#f9fafb',
            color: !formData.has_license ? '#fff' : '#374151',
          }}
          onClick={() => {
            updateFormData('has_license', false)
          }}
        >
          No License
        </button>
      </div>
    </div>

    {formData.has_license && (
      <>
        <div style={styles.fieldGroup}>
          <div style={styles.field}>
            <label style={styles.label}>License Number</label>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter license number"
              value={formData.license_number}
              onChange={(e) =>
                updateFormData('license_number', e.target.value)
              }
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Expiry Date</label>
            <input
              style={styles.input}
              type="date"
              value={formData.license_expiry}
              onChange={(e) =>
                updateFormData('license_expiry', e.target.value)
              }
            />
          </div>
        </div>
      </>
    )}

    {!formData.has_license && (
      <div style={{ marginBottom: '24px' }}>
        <label style={styles.label}>
          Would you like a chauffeur?
        </label>

        <div style={styles.radioGroup}>
          <button
            type="button"
            style={{
              ...styles.optionBtn,
              background: formData.needs_driver ? '#2563eb' : '#f9fafb',
              color: formData.needs_driver ? '#fff' : '#374151',
            }}
            onClick={() =>
              updateFormData('needs_driver', true)
            }
          >
            Yes, I need a driver
          </button>

          <button
            type="button"
            style={{
              ...styles.optionBtn,
              background: !formData.needs_driver ? '#2563eb' : '#f9fafb',
              color: !formData.needs_driver ? '#fff' : '#374151',
            }}
            onClick={() =>
              updateFormData('needs_driver', false)
            }
          >
            No, someone else will drive
          </button>
        </div>
      </div>
    )}

    <div style={styles.buttonRow}>
      <button
        style={styles.secondaryBtn}
        onClick={() => setStep(2)}
      >
        Back
      </button>

      <button
        style={styles.btn}
        onClick={() => setStep(4)}
      >
        Continue
      </button>
    </div>
  </>
)}
{step === 4 && (
  <>
    <div style={styles.fieldGroup}>
      <div style={styles.field}>
        <label style={styles.label}>
          Emergency Contact Name
        </label>

        <input
          style={styles.input}
          type="text"
          placeholder="Full name"
          value={formData.emergency_contact_name}
          onChange={(e) =>
            updateFormData(
              'emergency_contact_name',
              e.target.value
            )
          }
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>
          Emergency Contact Phone
        </label>

        <input
          style={styles.input}
          type="text"
          placeholder="08012345678"
          value={formData.emergency_contact_phone}
          onChange={(e) =>
            updateFormData(
              'emergency_contact_phone',
              e.target.value
            )
          }
        />
      </div>
    </div>

    <div style={styles.field}>
      <label style={styles.label}>
        Relationship
      </label>

      <select style={styles.input}>
        <option>Parent</option>
        <option>Sibling</option>
        <option>Friend</option>
        <option>Spouse</option>
        <option>Colleague</option>
      </select>
    </div>

    <div style={styles.buttonRow}>
      <button
        style={styles.secondaryBtn}
        onClick={() => setStep(3)}
      >
        Back
      </button>

      <button
        style={styles.btn}
        onClick={() => setStep(5)}
      >
        Continue
      </button>
    </div>
  </>
)}
{step === 5 && (
  <>
    <div style={styles.reviewCard}>
      <h3 style={styles.reviewTitle}>
        Review Your Booking
      </h3>

      <div style={styles.reviewRow}>
        <span>Car</span>
        <strong>{car?.name}</strong>
      </div>

      <div style={styles.reviewRow}>
        <span>Pickup Date</span>
        <strong>{pickupDate}</strong>
      </div>

      <div style={styles.reviewRow}>
        <span>Return Date</span>
        <strong>{returnDate}</strong>
      </div>

      <div style={styles.reviewRow}>
        <span>Phone Number</span>
        <strong>{formData.phone_number}</strong>
      </div>

      <div style={styles.reviewRow}>
        <span>State</span>
        <strong>{formData.state}</strong>
      </div>

      <div style={styles.reviewRow}>
        <span>Has License</span>
        <strong>
          {formData.has_license ? 'Yes' : 'No'}
        </strong>
      </div>

      {!formData.has_license && (
        <div style={styles.reviewRow}>
          <span>Needs Driver</span>
          <strong>
            {formData.needs_driver ? 'Yes' : 'No'}
          </strong>
        </div>
      )}

      {formData.has_license && (
        <div style={styles.reviewRow}>
          <span>License Number</span>
          <strong>{formData.license_number}</strong>
        </div>
      )}

      <div style={styles.reviewRow}>
        <span>Emergency Contact</span>
        <strong>
          {formData.emergency_contact_name}
        </strong>
      </div>

      <div style={styles.reviewRow}>
        <span>Total</span>
        <strong>
          ₦{totalPrice.toLocaleString()}
        </strong>
      </div>
    </div>

    <div style={styles.buttonRow}>
      <button
        style={styles.secondaryBtn}
        onClick={() => setStep(4)}
      >
        Back
      </button>

      <button
        style={{
          ...styles.btn,
          opacity: loading ? 0.7 : 1
        }}
        onClick={handleBooking}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Booking'}
      </button>
    </div>
  </>
)}
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
  stepIndicator: {
    background: '#eff6ff',
    color: '#2563eb',
    padding: '8px 14px',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: '600',
    display: 'inline-block',
    marginBottom: '24px',
  },
  buttonRow: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
  },
  
  secondaryBtn: {
    flex: 1,
    background: '#f3f4f6',
    color: '#374151',
    border: 'none',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  radioGroup: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  
  optionBtn: {
    flex: 1,
    border: '1.5px solid #e5e7eb',
    borderRadius: '10px',
    padding: '14px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
  reviewCard: {
    background: '#f9fafb',
    border: '1.5px solid #f0f0f0',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
  },
  
  reviewTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#0a0a0a',
  },
  
  reviewRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '14px',
    fontSize: '14px',
    color: '#374151',
  },
  statusBox: {
    background: '#fffbeb',
    border: '1px solid #fde68a',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '24px',
  },
  
  statusBadge: {
    display: 'inline-block',
    background: '#f59e0b',
    color: '#ffffff',
    padding: '6px 12px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '700',
    marginBottom: '10px',
  },
  
  statusText: {
    fontSize: '13px',
    color: '#92400e',
    lineHeight: '1.6',
  },
}

export default BookCar