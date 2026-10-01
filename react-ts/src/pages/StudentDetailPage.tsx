import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

interface UserDetail {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
  }
  address: {
    street: string
    city: string
  }
}

export function StudentDetailPage() {
  // 1. Ekstrak parameter :id dari URL bar browser
  const { id } = useParams<{ id: string }>()

  // 2. Hook navigasi programatik
  const navigate = useNavigate()

  const [user, setUser] = useState<UserDetail | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // 3. Efek dipicu saat pertama kali buka atau saat parameter :id berubah
  useEffect(() => {
    const abortController = new AbortController()

    const fetchDetail = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          signal: abortController.signal
        })
        if (!res.ok) throw new Error('Data mahasiswa tidak ditemukan!')
        const data: UserDetail = await res.json()
        setUser(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name === 'AbortError') return
          setError(err.message)
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchDetail()
    return () => abortController.abort()
  }, [id])

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'left' }}>
      {/* Navigasi kembali menggunakan navigate(-1) */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '1.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#475569',
          color: '#fff',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        ⬅️ Kembali
      </button>

      {isLoading && <p>⏳ Memuat profil lengkap mahasiswa...</p>}
      {error && <p style={{ color: '#ef4444' }}>❌ {error}</p>}

      {user && (
        <div style={{
          backgroundColor: '#1e293b',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #334155',
          color: '#f8fafc'
        }}>
          <h2 style={{ margin: '0 0 0.5rem 0', color: '#38bdf8' }}>{user.name}</h2>
          <p style={{ color: '#94a3b8', margin: 0 }}>@{user.username}</p>

          <hr style={{ borderColor: '#334155', margin: '1rem 0' }} />

          <p><strong>📧 Email:</strong> {user.email}</p>
          <p><strong>📱 Telepon:</strong> {user.phone}</p>
          <p><strong>🌐 Website:</strong> {user.website}</p>
          <p><strong>🏢 Perusahaan:</strong> {user.company.name} ({user.company.catchPhrase})</p>
          <p><strong>📍 Lokasi:</strong> {user.address.street}, {user.address.city}</p>
        </div>
      )}
    </div>
  )
}
