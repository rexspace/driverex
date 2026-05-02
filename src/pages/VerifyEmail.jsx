import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function VerifyEmail() {
  const [status, setStatus] = useState('loading')
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (!token) {
      setStatus('error')
      return
    }
    fetch(`https://driverex-backend.onrender.com/verify-email?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setStatus('success')
        } else {
          setStatus('error')
        }
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo} onClick={() => navigate('/')}>
          Drive<span style={styles.accent}>Rex</span>
        </div>
        {status === 'loading' && (
          <>
            <div style={styles.spinner}></div>
            <h2 style={styles.title}>Verifying your email...</h2>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </>
        )}
        {status === 'success' && (
          <>
            <div style={styles.icon}>✅</div>
            <h2 style={styles.title}>Email verified!</h2>
            <p style={styles.sub}>Your account is now active. You can login and start booking cars!</p>
            <button style={styles.btn} onClick={() => navigate('/login')}>
              Go to login →
            </button>
          </>
        )}
        {status === 'error' && (
          <>
            <div style={styles.icon}>❌</div>
            <h2 style={styles.title}>Verification failed</h2>
            <p style={styles.sub}>This link is invalid or has already been used. Try signing up again.</p>
            <button style={styles.btn} onClick={() => navigate('/signup')}>
              Sign up again →
            </button>
          </>
        )}
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
  },
  card: {
    background: 'white',
    border: '1.5px solid #f0f0f0',
    borderRadius: '20px',
    padding: '48px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  },
  logo: {
    fontWeight: '800',
    fontSize: '20px',
    color: '#0a0a0a',
    marginBottom: '32px',
    cursor: 'pointer',
    display: 'inline-block',
  },
  accent: { color: '#2563eb' },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #e5e7eb',
    borderTop: '3px solid #2563eb',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    margin: '0 auto 24px',
  },
  icon: { fontSize: '48px', marginBottom: '16px' },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#0a0a0a',
    marginBottom: '12px',
  },
  sub: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.6',
    marginBottom: '28px',
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
    width: '100%',
  },
}

export default VerifyEmail