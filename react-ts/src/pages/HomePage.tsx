import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { StudentCard } from "../components/StudentCard"
import type { Student } from "../types/student"
import { Button, getButtonClasses } from "../components/ui/Button"

interface FormDataShape {
  name: string
  role: string
  batch: number | ""
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
    name: "",
    role: "",
    batch: 0,
    skills: []
  })

  const [studentsState, setStudentsState] = useState<Student[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")

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
      batch: typeof formData.batch === "number" ? formData.batch : 1,
      isEnrolled: true,
      rating: 5,
      skills: formData.skills.length > 0 ? formData.skills : ["React"]
    }

    setStudentsState(prev => [...prev, newStudent])
    setFormData({ name: "", role: "", batch: 0, skills: [] })
  }

  const handleDeleteStudent = (indexToDelete: number) => {
    setStudentsState(prev => prev.filter((_, index) => index !== indexToDelete))
  }

  // Fetch API mahasiswa
  useEffect(() => {
    const abortController = new AbortController()

    const fetchUser = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", {
          signal: abortController.signal
        })
        if (!response.ok) throw new Error("Gagal mengambil data!")

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
          if (error.name === "AbortError") return
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

  if (isLoading) {
    return (
      <div className="text-center py-16 text-gray-500 dark:text-gray-400 font-medium">
        ⏳ Memuat data mahasiswa...
      </div>
    )
  }

  if (apiError) {
    return (
      <div className="text-center py-16 text-red-500 font-medium">
        Error: {apiError}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Toggle & Counter */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        <Button variant="secondary" size="sm" onClick={() => setShowDetails(prev => !prev)}>
          {showDetails ? "👁️ Sembunyikan Deskripsi" : "👁️ Tampilkan Deskripsi"}
        </Button>
        <Button variant="outline" size="sm" onClick={() => setCounter(prev => prev + 1)}>
          Hitung Interaksi: {counter}
        </Button>
      </div>

      {showDetails && (
        <p className="max-w-xl mx-auto mb-8 text-sm text-center text-gray-600 dark:text-gray-400">
          Selamat datang di portal mahasiswa! Klik tombol detail pada tiap kartu untuk melihat data lengkap via dynamic routing!
        </p>
      )}

      {/* Form Tambah Mahasiswa Adaptive (Persis Mengikuti Tema Card) */}
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm mb-8 transition-all">
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          ✨ Tambah Mahasiswa Baru
        </h3>

        <div className="flex flex-col gap-3.5">
          {/* Input 1: Nama */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Contoh: John Doe"
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3.5 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Input 2: Role / Keahlian */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5">
              Role / Keahlian
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              placeholder="Contoh: Frontend React Engineer"
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3.5 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Tombol Submit */}
          <Button
            variant="primary"
            size="md"
            className="w-full mt-2"
            onClick={handleAddStudent}
          >
            ➕ Tambah ke Daftar
          </Button>
        </div>
      </div>

      {/* Search Input Adaptive */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Cari nama mahasiswa..."
          className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Grid Kartu Mahasiswa Responsif */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
            <div className="flex items-center justify-between gap-2">
              {/* Tautan Navigasi Dinamis ke Halaman Detail */}
              <Link
                to={`/students/${student.id ?? (index + 1)}`}
                className={getButtonClasses("primary", "sm")}
              >
                Lihat Detail ➡️
              </Link>

              <Button
                onClick={() => handleDeleteStudent(index)}
                variant="danger"
                size="sm"
              >
                Hapus
              </Button>
            </div>
          </StudentCard>
        ))}
      </div>
    </div>
  )
}
