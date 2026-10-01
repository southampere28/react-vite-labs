import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { StudentCard } from '../components/StudentCard'
import type { Student } from '../types/student'

interface FormDataShape {
  name: string
  role: string
  batch: number | ''
  skills: string[]
}

interface ApiUser {
  id: number
  name: string
  company: {
    name: string
    bs: string
  }
}

export function HomePage() {
  const [showDetails, setShowDetails] = useState<boolean>(true)
  const [counter, setCounter] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [apiError, setApiError] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormDataShape>({
    name: '',
    role: '',
    batch: 0,
    skills: []
  })

  const [studentsState, setStudentsState] = useState<Student[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Derived state untuk pencarian
  const filteredStudents = studentsState.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddStudent = () => {
    if (!formData.name.trim() || !formData.role.trim()) return

    const newStudent: Student = {
      id: Date.now(),
      name: formData.name,
      role: formData.role,
      batch: typeof formData.batch === 'number' ? formData.batch : 1,
      isEnrolled: true,
      rating: 5,
      skills: formData.skills.length > 0 ? formData.skills : ['React']
    }

    setStudentsState(prev => [...prev, newStudent])
    setFormData({ name: '', role: '', batch: 0, skills: [] })
  }

  const handleDeleteStudent = (indexToDelete: number) => {
    setStudentsState(prev => prev.filter((_, index) => index !== indexToDelete))
  }

  // Fetch API mahasiswa
  useEffect(() => {
    const abortController = new AbortController()

    const fetchUser = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          signal: abortController.signal
        })
        if (!response.ok) throw new Error('Gagal mengambil data!')

        const data: ApiUser[] = await response.json()
        const mappedStudents: Student[] = data.map((user: ApiUser) => ({
          id: user.id,
          name: user.name,
          role: user.company.bs,
          batch: 3,
          isEnrolled: true,
          rating: 5,
          skills: [user.company.name]
        }))

        setStudentsState(mappedStudents)
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') return
          setApiError(error.message)
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchUser()
    return () => abortController.abort()
  }, [])

  if (isLoading) return <p style={{ textAlign: 'center', padding: '2rem' }}>⏳ Memuat data mahasiswa...</p>
  if (apiError) return <p style={{ color: '#ef4444', textAlign: 'center' }}>Error: {apiError}</p>

  return (
    <div>
      {/* Toggle & Counter */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <button onClick={() => setShowDetails(prev => !prev)}>
          {showDetails ? 'Sembunyikan Deskripsi' : 'Tampilkan Deskripsi'}
        </button>
        <button onClick={() => setCounter(prev => prev + 1)}>
          Hitung Interaksi: {counter}
        </button>
      </div>

      {showDetails && (
        <p style={{ maxWidth: '600px', margin: '0 auto 1.5rem', color: '#64748b' }}>
          Selamat datang di portal mahasiswa! Klik tombol detail pada tiap kartu untuk melihat data lengkap via dynamic routing!
        </p>
      )}

      {/* Form Tambah */}
      <div style={{
        maxWidth: '400px',
        margin: '0 auto 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '1rem',
        border: '1px solid #334155',
        borderRadius: '8px'
      }}>
        <h3>Tambah Mahasiswa Baru</h3>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Nama mahasiswa..."
        />
        <input
          type="text"
          value={formData.role}
          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
          placeholder="Role/Keahlian..."
        />
        <button onClick={handleAddStudent}>➕ Tambah ke Daftar</button>
      </div>

      {/* Search Input */}
      <div style={{ margin: '0 auto 1.5rem', maxWidth: '400px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Cari nama mahasiswa..."
          style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
        />
      </div>

      {/* Grid Kartu Mahasiswa */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1rem',
        padding: '1rem 0'
      }}>
        {filteredStudents.map((student, index) => (
          <StudentCard
            key={student.id ?? index}
            name={student.name}
            role={student.role}
            batch={student.batch}
            isEnrolled={student.isEnrolled}
            rating={student.rating}
            skills={student.skills}
          >
            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
              {/* Tautan Navigasi Dinamis ke Halaman Detail */}
              <Link
                to={`/students/${student.id ?? (index + 1)}`}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '0.85rem'
                }}
              >
                Lihat Detail ➡️
              </Link>
              <button
                onClick={() => handleDeleteStudent(index)}
                style={{ backgroundColor: '#ef4444', color: '#fff', fontSize: '0.85rem' }}
              >
                Hapus
              </button>
            </div>
          </StudentCard>
        ))}
      </div>
    </div>
  )
}
