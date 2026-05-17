import { useNavigate } from 'react-router-dom'

function CarCard({ id, name, type, seats, price, rating, trips, emoji, badge, image_url }) {
  const navigate = useNavigate()
  console.log('Car:', name, 'image_url:', image_url)

  return (
    <div 
    style={styles.card}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px)'
      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'
      e.currentTarget.style.borderColor = '#dbeafe'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
      e.currentTarget.style.borderColor = '#f0f0f0'
    }}
  >
      <div style={styles.imgBox}  onClick={() => navigate(`/cars/${id}`)}>
        {image_url ? (
          <img src={image_url} alt={name} style={styles.img} />
        ) : (
          <span style={styles.emoji}>{emoji}</span>
        )}
        <div style={styles.badge}>{badge}</div>
      </div>
      <div style={styles.info}>
      <div
  style={{...styles.name, cursor: 'pointer'}}
  onClick={() => navigate(`/cars/${id}`)}
>
  {name}
</div>
        <div style={styles.type}>{type}</div>
        <div style={styles.features}>
          <span style={styles.feature}>👤 {seats} seats</span>
          <span style={styles.feature}>❄️ AC</span>
          <span style={styles.feature}>⛽ Petrol</span>
        </div>
        <div style={styles.footer}>
          <div>
            <div style={styles.price}>
              ₦{price.toLocaleString()}
              <span style={styles.perDay}>/day</span>
            </div>
            <div style={styles.rating}>⭐ {rating} ({trips} trips)</div>
          </div>
          <button
            style={styles.bookBtn}
            onClick={() => navigate(`/book/${id}`)}>
            Book now
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: '#ffffff',
    border: '1.5px solid #f0f0f0',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  imgBox: {
    height: '180px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f9fafb',
    position: 'relative',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  emoji: { fontSize: '64px' },
  badge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: '#eff6ff',
    border: '1px solid #dbeafe',
    borderRadius: '100px',
    padding: '4px 10px',
    fontSize: '11px',
    color: '#2563eb',
    fontWeight: '600',
  },
  info: { padding: '20px' },
  name: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0a0a0a',
    marginBottom: '4px',
  },
  type: {
    fontSize: '13px',
    color: '#9ca3af',
    marginBottom: '14px',
  },
  features: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
  },
  feature: {
    fontSize: '12px',
    color: '#6b7280',
    background: '#f9fafb',
    padding: '4px 10px',
    borderRadius: '6px',
    border: '1px solid #f0f0f0',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: '1px solid #f0f0f0',
    paddingTop: '14px',
  },
  price: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#0a0a0a',
  },
  perDay: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#9ca3af',
  },
  rating: { fontSize: '12px', color: '#6b7280', marginTop: '2px' },
  bookBtn: {
    background: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  card: {
    background: '#ffffff',
    border: '1.5px solid #f0f0f0',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
}

export default CarCard