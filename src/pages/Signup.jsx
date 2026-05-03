import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup({ onLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://driverex-backend.onrender.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.detail)
        setLoading(false)
        return
      }
      // Auto login after signup
      const loginRes = await fetch('https://driverex-backend.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const loginData = await loginRes.json()
      localStorage.setItem('token', loginData.token)
      localStorage.setItem('name', loginData.name)
      localStorage.setItem('email', email)
      onLogin(loginData.name)
    } catch (err) {
      setError('Something went wrong')
      setLoading(false)
    }
  }
  
  if (success) return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.logo} onClick={() => navigate('/')}>
          Drive<span style={styles.accent}>Rex</span>
        </div>
        <h1 style={styles.heading}>Almost there!</h1>
        <p style={styles.sub}>Just one more step to start renting</p>
      </div>
      <div style={styles.right}>
        <div style={styles.card}>
          <div style={styles.successIcon}>📧</div>
          <h2 style={styles.title}>Check your email!</h2>
          <p style={styles.cardSub}>
            We sent a verification link to <strong>{email}</strong>.
            Click it to activate your account.
          </p>
          <div style={styles.infoBox}>
            <p style={styles.infoText}>💡 Check your spam folder if you don't see it within a minute.</p>
          </div>
          <button style={styles.btn} onClick={() => navigate('/login')}>
            Go to login →
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.logo} onClick={() => navigate('/')}>
          Drive<span style={styles.accent}>Rex</span>
        </div>
        <h1 style={styles.heading}>Start renting premium cars today</h1>
        <p style={styles.sub}>Join 2,000+ happy DriveRex customers across Nigeria</p>
        <div style={styles.features}>
          <div style={styles.feature}>🚗 Access to 48+ cars</div>
          <div style={styles.feature}>⚡ Book in under 2 minutes</div>
          <div style={styles.feature}>🔒 Secure payments</div>
          <div style={styles.feature}>🇳🇬 Available in Abuja & Lagos</div>
        </div>
      </div>
      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.title}>Create account</h2>
          <p style={styles.cardSub}>Free to join, no credit card required</p>

          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <input
              style={styles.input}
              type="text"
              placeholder="Rex Doe"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              placeholder="rex@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            style={{
              ...styles.btn,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
                <span style={{
                  width: '16px', height: '16px',
                  border: '2px solid rgba(0,0,0,0.2)',
                  borderTop: '2px solid #0a0a0a',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                  display: 'inline-block',
                }}></span>
                Creating account...
              </span>
            ) : 'Create account →'}
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </button>

          <p style={styles.switch}>
            Already have an account?{' '}
            <span style={styles.link} onClick={() => navigate('/login')}>
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
  },
  left: {
    flex: 1,
    background: '#0a0a0a',
    padding: '64px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: '800',
    fontSize: '24px',
    color: 'white',
    marginBottom: '48px',
    cursor: 'pointer',
  },
  accent: { color: '#2563eb' },
  heading: {
    fontSize: '36px',
    fontWeight: '800',
    color: 'white',
    lineHeight: '1.1',
    letterSpacing: '-1px',
    marginBottom: '16px',
  },
  sub: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '40px',
  },
  features: { display: 'flex', flexDirection: 'column', gap: '12px' },
  feature: { fontSize: '15px', color: 'rgba(255,255,255,0.7)' },
  right: {
    width: '480px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
    background: '#f9fafb',
  },
  card: {
    background: 'white',
    border: '1.5px solid #f0f0f0',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  },
  successIcon: {
    fontSize: '48px',
    textAlign: 'center',
    marginBottom: '16px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#0a0a0a',
    marginBottom: '8px',
    textAlign: 'center',
  },
  cardSub: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '28px',
    textAlign: 'center',
    lineHeight: '1.6',
  },
  infoBox: {
    background: '#eff6ff',
    border: '1px solid #dbeafe',
    borderRadius: '10px',
    padding: '14px',
    marginBottom: '24px',
  },
  infoText: {
    fontSize: '13px',
    color: '#2563eb',
    lineHeight: '1.5',
  },
  error: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '13px',
    color: '#dc2626',
    marginBottom: '16px',
  },
  field: { marginBottom: '16px' },
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
    marginTop: '8px',
    marginBottom: '20px',
  },
  switch: {
    fontSize: '13px',
    color: '#6b7280',
    textAlign: 'center',
  },
  link: {
    color: '#2563eb',
    fontWeight: '600',
    cursor: 'pointer',
  },
}

export default Signup