import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const [stats, setStats] = useState(null)
  const [bookings, setBookings] = useState([])
  const [cars, setCars] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddCar, setShowAddCar] = useState(false)
  const [newCar, setNewCar] = useState({
    name: '', type: 'Sedan', seats: 5, price: 0,
    rating: 5.0, trips: 0, emoji: '🚗', badge: 'New', image_url: ''
  })
  const navigate = useNavigate()
  const user = localStorage.getItem('name')
  const [editingCar, setEditingCar] = useState(null)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    fetchAll()
  }, [])

  const fetchAll = async () => {
    const [statsRes, bookingsRes, carsRes] = await Promise.all([
      fetch('https://driverex-backend.onrender.com/admin/stats'),
      fetch('https://driverex-backend.onrender.com/admin/bookings'),
      fetch('https://driverex-backend.onrender.com/cars'),
    ])
    setStats(await statsRes.json())
    setBookings(await bookingsRes.json())
    setCars(await carsRes.json())
  }

  const handleAddCar = async () => {
    const response = await fetch('https://driverex-backend.onrender.com/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCar)
    })
    if (response.ok) {
      setShowAddCar(false)
      setNewCar({ name: '', type: 'Sedan', seats: 5, price: 0, rating: 5.0, trips: 0, emoji: '🚗', badge: 'New', image_url: '' })
      fetchAll()
      alert('Car added successfully!')
    }
  }

  const handleDeleteCar = async (carId) => {
    if (!window.confirm('Delete this car?')) return
    await fetch(`https://driverex-backend.onrender.com/cars/${carId}`, { method: 'DELETE' })
    fetchAll()
  }
  const handleEditCar = (car) => {
    setEditingCar({...car})
  }
  
  const handleUpdateCar = async () => {
    const response = await fetch(`https://driverex-backend.onrender.com/cars/${editingCar.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: editingCar.name,
        type: editingCar.type,
        seats: editingCar.seats,
        price: editingCar.price,
        rating: editingCar.rating,
        trips: editingCar.trips,
        emoji: editingCar.emoji,
        badge: editingCar.badge,
        image_url: editingCar.image_url || '',
      })
    })
    if (response.ok) {
      setEditingCar(null)
      fetchAll()
      alert('Car updated successfully!')
    }
  }
  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          Drive<span style={styles.accent}>Rex</span>
          <div style={styles.adminBadge}>Admin</div>
        </div>
        <nav style={styles.nav}>
          {['overview', 'bookings', 'cars'].map(tab => (
            <div
              key={tab}
              style={{
                ...styles.navItem,
                ...(activeTab === tab ? styles.navItemActive : {})
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'overview' && '📊'} 
              {tab === 'bookings' && '📋'} 
              {tab === 'cars' && '🚗'}
              {' '}{tab.charAt(0).toUpperCase() + tab.slice(1)}
            </div>
          ))}
        </nav>
        <div style={styles.sidebarFooter}>
          <div style={styles.adminUser}>👤 {user}</div>
          <button style={styles.backBtn} onClick={() => navigate('/')}>
            ← Back to site
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={styles.main}>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && stats && stats.total_revenue !== undefined && (
          <div>
            <h1 style={styles.pageTitle}>Dashboard Overview</h1>
            <p style={styles.pageSub}>Welcome back, {user}! Here's your business at a glance.</p>
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>🚗</div>
                <div style={styles.statNum}>{stats.total_cars}</div>
                <div style={styles.statLabel}>Total Cars</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>📋</div>
                <div style={styles.statNum}>{stats.total_bookings}</div>
                <div style={styles.statLabel}>Total Bookings</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>👥</div>
                <div style={styles.statNum}>{stats.total_users}</div>
                <div style={styles.statLabel}>Registered Users</div>
              </div>
              <div style={{...styles.statCard, ...styles.revenueCard}}>
                <div style={styles.statIcon}>💰</div>
                <div style={{...styles.statNum, color: 'white'}}>
                ₦{(stats.total_revenue || 0).toLocaleString()}
                </div>
                <div style={{...styles.statLabel, color: 'rgba(255,255,255,0.7)'}}>
                  Total Revenue
                </div>
              </div>
            </div>

            <h2 style={styles.sectionTitle}>Recent Bookings</h2>
            <div style={styles.table}>
              <div style={styles.tableHeader}>
                <span>Customer</span>
                <span>Car</span>
                <span>Dates</span>
                <span>Amount</span>
                <span>Status</span>
              </div>
              {bookings.slice(0, 5).map(b => (
                <div key={b.id} style={styles.tableRow}>
                  <span style={styles.customerName}>{b.customer_name}</span>
                  <span>{b.car_emoji} {b.car_name}</span>
                  <span style={styles.dates}>{b.pickup_date} → {b.return_date}</span>
                  <span style={styles.amount}>₦{b.total_price.toLocaleString()}</span>
                  <span style={styles.status}>{b.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div>
            <h1 style={styles.pageTitle}>All Bookings</h1>
            <p style={styles.pageSub}>{bookings.length} total bookings</p>
            <div style={styles.table}>
              <div style={styles.tableHeader}>
                <span>Customer</span>
                <span>Car</span>
                <span>Pickup</span>
                <span>Return</span>
                <span>Amount</span>
                <span>Status</span>
              </div>
              {bookings.map(b => (
                <div key={b.id} style={styles.tableRow}>
                  <div>
                    <div style={styles.customerName}>{b.customer_name}</div>
                    <div style={styles.customerEmail}>{b.customer_email}</div>
                  </div>
                  <span>{b.car_emoji} {b.car_name}</span>
                  <span>{b.pickup_date}</span>
                  <span>{b.return_date}</span>
                  <span style={styles.amount}>₦{b.total_price.toLocaleString()}</span>
                  <span style={styles.status}>{b.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CARS TAB */}
        {activeTab === 'cars' && (
          <div>
            <div style={styles.carsHeader}>
              <div>
                <h1 style={styles.pageTitle}>Manage Fleet</h1>
                <p style={styles.pageSub}>{cars.length} cars in your fleet</p>
              </div>
              <button style={styles.addBtn} onClick={() => setShowAddCar(!showAddCar)}>
                + Add new car
              </button>
            </div>

            {/* Add Car Form */}
            {showAddCar && (
              <div style={styles.addForm}>
                <h3 style={styles.formTitle}>Add New Car</h3>
                <div style={styles.formGrid}>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Car Name</label>
                    <input style={styles.formInput} placeholder="Toyota Camry 2024"
                      value={newCar.name}
                      onChange={e => setNewCar({...newCar, name: e.target.value})} />
                  </div>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Type</label>
                    <select style={styles.formInput}
                      value={newCar.type}
                      onChange={e => setNewCar({...newCar, type: e.target.value})}>
                      <option>Sedan</option>
                      <option>SUV</option>
                      <option>Luxury</option>
                      <option>Economy</option>
                    </select>
                  </div>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Price per day (₦)</label>
                    <input style={styles.formInput} type="number" placeholder="25000"
                      value={newCar.price}
                      onChange={e => setNewCar({...newCar, price: parseInt(e.target.value)})} />
                  </div>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Seats</label>
                    <input style={styles.formInput} type="number" placeholder="5"
                      value={newCar.seats}
                      onChange={e => setNewCar({...newCar, seats: parseInt(e.target.value)})} />
                  </div>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Emoji</label>
                    <input style={styles.formInput} placeholder="🚗"
                      value={newCar.emoji}
                      onChange={e => setNewCar({...newCar, emoji: e.target.value})} />
                  </div>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Badge</label>
                    <select style={styles.formInput}
                      value={newCar.badge}
                      onChange={e => setNewCar({...newCar, badge: e.target.value})}>
                      <option>New</option>
                      <option>Popular</option>
                      <option>Premium</option>
                      <option>Luxury</option>
                      <option>Economy</option>
                    </select>
                  </div>
                  <div style={{...styles.formField, gridColumn: '1 / -1'}}>
                    <label style={styles.formLabel}>Image URL (optional)</label>
                    <input style={styles.formInput}
                      placeholder="https://example.com/car.jpg"
                      value={newCar.image_url}
                      onChange={e => setNewCar({...newCar, image_url: e.target.value})} />
                  </div>
                </div>
                <div style={styles.formActions}>
                  <button style={styles.addBtn} onClick={handleAddCar}>Add Car</button>
                  <button style={styles.cancelBtn} onClick={() => setShowAddCar(false)}>Cancel</button>
                </div>
              </div>
            )}

            {/* Cars list */}
            <div style={styles.carsList}>
            {editingCar && (
  <div style={styles.addForm}>
    <h3 style={styles.formTitle}>Edit Car — {editingCar.name}</h3>
    <div style={styles.formGrid}>
      <div style={styles.formField}>
        <label style={styles.formLabel}>Car Name</label>
        <input style={styles.formInput}
          value={editingCar.name}
          onChange={e => setEditingCar({...editingCar, name: e.target.value})} />
      </div>
      <div style={styles.formField}>
        <label style={styles.formLabel}>Type</label>
        <select style={styles.formInput}
          value={editingCar.type}
          onChange={e => setEditingCar({...editingCar, type: e.target.value})}>
          <option>Sedan</option>
          <option>SUV</option>
          <option>Luxury</option>
          <option>Economy</option>
        </select>
      </div>
      <div style={styles.formField}>
        <label style={styles.formLabel}>Price per day (₦)</label>
        <input style={styles.formInput} type="number"
          value={editingCar.price}
          onChange={e => setEditingCar({...editingCar, price: parseInt(e.target.value)})} />
      </div>
      <div style={styles.formField}>
        <label style={styles.formLabel}>Seats</label>
        <input style={styles.formInput} type="number"
          value={editingCar.seats}
          onChange={e => setEditingCar({...editingCar, seats: parseInt(e.target.value)})} />
      </div>
      <div style={styles.formField}>
        <label style={styles.formLabel}>Emoji</label>
        <input style={styles.formInput}
          value={editingCar.emoji}
          onChange={e => setEditingCar({...editingCar, emoji: e.target.value})} />
      </div>
      <div style={styles.formField}>
        <label style={styles.formLabel}>Badge</label>
        <select style={styles.formInput}
          value={editingCar.badge}
          onChange={e => setEditingCar({...editingCar, badge: e.target.value})}>
          <option>New</option>
          <option>Popular</option>
          <option>Premium</option>
          <option>Luxury</option>
          <option>Economy</option>
        </select>
      </div>
      <div style={{...styles.formField, gridColumn: '1 / -1'}}>
        <label style={styles.formLabel}>Image URL</label>
        <input style={styles.formInput}
          placeholder="https://example.com/car.jpg"
          value={editingCar.image_url || ''}
          onChange={e => setEditingCar({...editingCar, image_url: e.target.value})} />
      </div>
    </div>
    <div style={styles.formActions}>
      <button style={styles.addBtn} onClick={handleUpdateCar}>Save Changes</button>
      <button style={styles.cancelBtn} onClick={() => setEditingCar(null)}>Cancel</button>
    </div>
  </div>
)}
            {cars.map(car => (
            <div key={car.id} style={styles.carRow}>
            <div style={styles.carEmoji}>{car.emoji}</div>
            <div style={styles.carInfo}>
             <div style={styles.carName}>{car.name}</div>
            <div style={styles.carMeta}>{car.type} · {car.seats} seats · ⭐{car.rating}</div>
            </div>
                <div style={styles.carPrice}>₦{car.price.toLocaleString()}/day</div>
        <div style={styles.carBadge}>{car.badge}</div>
            <button style={styles.editBtn} onClick={() => handleEditCar(car)}>
                Edit
                </button>
            <button style={styles.deleteBtn} onClick={() => handleDeleteCar(car.id)}>
             Delete
            </button>
            </div>
))}
              
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#0a0a0a',
    padding: '32px 20px',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
  },
  sidebarLogo: {
    fontWeight: '800',
    fontSize: '20px',
    color: 'white',
    marginBottom: '40px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  accent: { color: '#2563eb' },
  adminBadge: {
    background: '#2563eb',
    color: 'white',
    fontSize: '10px',
    padding: '2px 8px',
    borderRadius: '100px',
    fontWeight: '600',
  },
  nav: { flex: 1 },
  navItem: {
    padding: '12px 16px',
    borderRadius: '10px',
    color: 'rgba(255,255,255,0.5)',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '4px',
    textTransform: 'capitalize',
  },
  navItemActive: {
    background: 'rgba(37,99,235,0.15)',
    color: '#60a5fa',
  },
  sidebarFooter: { borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' },
  adminUser: { fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' },
  backBtn: {
    background: 'transparent',
    color: 'rgba(255,255,255,0.4)',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '12px',
    cursor: 'pointer',
    width: '100%',
  },
  main: {
    marginLeft: '240px',
    flex: 1,
    padding: '48px',
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#0a0a0a',
    marginBottom: '8px',
    letterSpacing: '-0.5px',
  },
  pageSub: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '32px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '48px',
  },
  statCard: {
    background: 'white',
    border: '1.5px solid #f0f0f0',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  revenueCard: {
    background: '#2563eb',
    border: 'none',
  },
  statIcon: { fontSize: '24px', marginBottom: '12px' },
  statNum: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#0a0a0a',
    marginBottom: '4px',
  },
  statLabel: { fontSize: '13px', color: '#6b7280' },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0a0a0a',
    marginBottom: '16px',
  },
  table: {
    background: 'white',
    border: '1.5px solid #f0f0f0',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr 1fr',
    padding: '14px 20px',
    background: '#f9fafb',
    borderBottom: '1px solid #f0f0f0',
    fontSize: '12px',
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    gap: '12px',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr 1fr',
    padding: '16px 20px',
    borderBottom: '1px solid #f9fafb',
    fontSize: '14px',
    color: '#374151',
    alignItems: 'center',
    gap: '12px',
  },
  customerName: { fontWeight: '600', color: '#0a0a0a' },
  customerEmail: { fontSize: '12px', color: '#9ca3af' },
  dates: { fontSize: '13px', color: '#6b7280' },
  amount: { fontWeight: '700', color: '#0a0a0a' },
  status: {
    background: '#d1fae5',
    color: '#065f46',
    padding: '4px 10px',
    borderRadius: '100px',
    fontSize: '11px',
    fontWeight: '600',
    display: 'inline-block',
  },
  carsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
  },
  addBtn: {
    background: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  addForm: {
    background: 'white',
    border: '1.5px solid #f0f0f0',
    borderRadius: '16px',
    padding: '28px',
    marginBottom: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  formTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0a0a0a',
    marginBottom: '20px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '20px',
  },
  formField: {},
  formLabel: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  formInput: {
    width: '100%',
    background: '#f9fafb',
    border: '1.5px solid #e5e7eb',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '14px',
    color: '#0a0a0a',
    outline: 'none',
    boxSizing: 'border-box',
  },
  formActions: { display: 'flex', gap: '12px' },
  cancelBtn: {
    background: 'transparent',
    color: '#6b7280',
    border: '1.5px solid #e5e7eb',
    padding: '12px 20px',
    borderRadius: '10px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  carsList: {
    background: 'white',
    border: '1.5px solid #f0f0f0',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  carRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 24px',
    borderBottom: '1px solid #f9fafb',
  },
  carEmoji: { fontSize: '32px' },
  carInfo: { flex: 1 },
  carName: { fontSize: '15px', fontWeight: '700', color: '#0a0a0a', marginBottom: '2px' },
  carMeta: { fontSize: '13px', color: '#6b7280' },
  carPrice: { fontSize: '15px', fontWeight: '700', color: '#2563eb' },
  carBadge: {
    background: '#eff6ff',
    color: '#2563eb',
    padding: '4px 12px',
    borderRadius: '100px',
    fontSize: '12px',
    fontWeight: '600',
    border: '1px solid #dbeafe',
  },
  deleteBtn: {
    background: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca',
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  editBtn: {
    background: '#eff6ff',
    color: '#2563eb',
    border: '1px solid #dbeafe',
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    marginRight: '8px',
  },
}

export default Admin

