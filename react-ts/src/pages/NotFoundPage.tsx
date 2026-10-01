import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div style={{ padding: '3rem 1rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', margin: 0, color: '#ef4444' }}>404</h1>
      <h2>Halaman Tidak Ditemukan!</h2>
      <p style={{ color: '#94a3b8' }}>URL yang kamu tuju tidak tersedia.</p>
      
      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          borderRadius: '6px',
          textDecoration: 'none'
        }}
      >
        ⬅️ Kembali ke Beranda
      </Link>
    </div>
  )
}
