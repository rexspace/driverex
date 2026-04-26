import { useState, useEffect } from 'react'
import CarCard from './CarCard'

function CarListings() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/cars')
      .then(response => {
        console.log('Response status:', response.status)
        return response.json()
      })
      .then(data => {
        console.log('Cars data:', data)
        setCars(data)
        setLoading(false)
      })
      .catch(err => {
        console.log('Error:', err)
        setError('Could not load cars')
        setLoading(false)
      })
  }, [])

  if (loading) return (
    <div style={styles.center}>
      <p style={styles.message}>Loading cars...</p>
    </div>
  )

  if (error) return (
    <div style={styles.center}>
      <p style={styles.message}>{error}</p>
    </div>
  )

  return (
    <div style={styles.section} id = "fleet">
      <div style={styles.header}>
        <h2 style={styles.title}>Our fleet</h2>
        <span style={styles.link}>View all cars</span>
      </div>
      <div style={styles.grid}>
        {cars.map(car => (
          <CarCard
            key={car.id}
            id={car.id}
            name={car.name}
            type={car.type}
            seats={car.seats}
            price={car.price}
            rating={car.rating}
            trips={car.trips}
            emoji={car.emoji}
            badge={car.badge}
            image_url={car.image_url}
          />
        ))}
      </div>
    </div>
  )
}

const styles = {
  section: {
    padding: '64px 48px',
    backgroundColor: '#f9fafb',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#0a0a0a',
    letterSpacing: '-0.5px',
  },
  link: {
    fontSize: '14px',
    color: '#2563eb',
    cursor: 'pointer',
    fontWeight: '500',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  center: {
    padding: '64px 48px',
    backgroundColor: '#f9fafb',
    textAlign: 'center',
  },
  message: {
    color: '#6b7280',
    fontSize: '16px',
  },
}

export default CarListings