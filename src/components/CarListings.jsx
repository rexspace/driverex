import { useState, useEffect } from 'react'
import CarCard from './CarCard'

function SkeletonCard() {
  return (
    <div style={styles.skeleton}>
      <div style={{...styles.shimmer, height: '180px', borderRadius: '12px 12px 0 0'}}></div>
      <div style={styles.skeletonBody}>
        <div style={{...styles.shimmer, height: '16px', width: '70%', borderRadius: '6px', marginBottom: '8px'}}></div>
        <div style={{...styles.shimmer, height: '12px', width: '40%', borderRadius: '6px', marginBottom: '16px'}}></div>
        <div style={{display: 'flex', gap: '8px', marginBottom: '16px'}}>
          <div style={{...styles.shimmer, height: '28px', width: '70px', borderRadius: '6px'}}></div>
          <div style={{...styles.shimmer, height: '28px', width: '50px', borderRadius: '6px'}}></div>
          <div style={{...styles.shimmer, height: '28px', width: '60px', borderRadius: '6px'}}></div>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '14px'}}>
          <div>
            <div style={{...styles.shimmer, height: '20px', width: '80px', borderRadius: '6px', marginBottom: '6px'}}></div>
            <div style={{...styles.shimmer, height: '12px', width: '60px', borderRadius: '6px'}}></div>
          </div>
          <div style={{...styles.shimmer, height: '36px', width: '80px', borderRadius: '8px'}}></div>
        </div>
      </div>
    </div>
  )
}

function CarListings() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetch('https://driverex-backend.onrender.com/cars')
      .then(response => response.json())
      .then(data => {
        setCars(data)
        setLoading(false)
      })
      .catch(err => {
        setError('Could not load cars')
        setLoading(false)
      })
  }, [])

  const filters = ['All', 'Sedan', 'SUV', 'Luxury', 'Economy']

  const filteredCars = filter === 'All'
    ? cars
    : cars.filter(car => car.type === filter || car.badge === filter)

  if (error) return (
    <div style={styles.center}>
      <p style={styles.message}>{error}</p>
    </div>
  )

  return (
    <div style={styles.section} id="fleet">
      <div style={styles.header}>
        <h2 style={styles.title}>Our fleet</h2>
        <span style={styles.link}>View all cars</span>
      </div>

      <div style={styles.filterRow}>
        {filters.map(f => (
          <button
            key={f}
            style={{
              ...styles.filterBtn,
              ...(filter === f ? styles.filterBtnActive : {})
            }}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={styles.grid}>
        {loading ? (
          Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : filteredCars.length === 0 ? (
          <div style={styles.empty}>
            <p style={styles.emptyText}>No cars found in this category</p>
          </div>
        ) : (
          filteredCars.map(car => (
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
          ))
        )}
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
    marginBottom: '20px',
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
  filterRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '28px',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '8px 18px',
    borderRadius: '100px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    border: '1.5px solid #e5e7eb',
    background: 'white',
    color: '#6b7280',
    transition: 'all 0.2s',
  },
  filterBtnActive: {
    background: '#2563eb',
    color: 'white',
    border: '1.5px solid #2563eb',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
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
  empty: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '48px',
  },
  emptyText: {
    color: '#6b7280',
    fontSize: '16px',
  },
  skeleton: {
    background: 'white',
    border: '1.5px solid #f0f0f0',
    borderRadius: '16px',
    overflow: 'hidden',
  },
  skeletonBody: {
    padding: '20px',
  },
  shimmer: {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  },
}

const shimmerStyle = document.createElement('style')
shimmerStyle.textContent = `
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`
document.head.appendChild(shimmerStyle)

export default CarListings