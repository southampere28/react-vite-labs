import { Header } from './components/Header'
import './App.css'
import { StudentCard, type StudentCardProps } from './components/StudentCard'
import { MarkdownViewer } from './components/MarkdownViewer'
import progressMarkdownDay1 from '../../docs/progress/minggu-01/PROGRESS_HARI_01.md?raw'
import progressMarkdownDay2 from '../../docs/progress/minggu-01/PROGRESS_HARI_02.md?raw'
import progressMarkdownDay3 from '../../docs/progress/minggu-01/PROGRESS_HARI_03.md?raw'
import { useEffect, useState } from 'react'

interface formDataShape {
  name: string
  role: string
  batch: number | ''
  skills: string[]
}

function App() {

  // toggle UI / Counter
  const [showDetails, setShowDetails] = useState<boolean>(true)
  const [counter, setCounter] = useState<number>(0)

  // state object immutable pattern
  const [formData, setFormData] = useState<formDataShape>
  ({ 
    name: '', 
    role: '', 
    batch: 0,
    skills: []
  })

  // array of dynamic students
  const students: StudentCardProps[] = [
    {
      name: "Pramudya",
      role: "Frontend Developer",
      batch: 3,
      isEnrolled: true,
      rating: 5,
      skills: ['React', 'TypeScript', 'CSS'],
    },
    {
      name: "Budi",
      role: "Backend Developer",
      batch: 3,
      isEnrolled: false,
      rating: 4,
      skills: ['Node.js', 'Express', 'MongoDB'],
    },
    {
      name: "Siti",
      role: "Fullstack Developer",
      batch: 3,
      isEnrolled: true,
      rating: 5,
      skills: ['React', 'Node.js', 'TypeScript'],
    }
  ]

  // using students state directly
  const [studentsState, setStudentsState] = useState<StudentCardProps[]>(students)
  
  // data for search query
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredStudents = studentsState.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  )


  // function to add a new student
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    const newStudent: StudentCardProps = {
      name: formData.name,
      role: formData.role,
      batch: formData.batch == '' ? 0 : formData.batch,
      isEnrolled: true,
      rating: 0,
      skills: formData.skills
    }

    setStudentsState(prev => [...prev, newStudent])
    // clear form data
    setFormData({
      name: '',
      role: '',
      batch: 0,
      skills: []
    })
  }

  // function to delete a student
  const handleDeleteStudent = (name: string) => {
    setStudentsState(prev => prev.filter(student => student.name !== name))
  }

  // days 3: side effects

  interface ApiUser {
    id: number
    name: string
    company: {
      name: string
      bs: string
    }
  }

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [apiError, setApiError] = useState<string | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    
    // function fetch user
    const fetchUser = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', { signal: abortController.signal })

        if (!response.ok) throw new Error('Failed to fetch user (' + response.status + ')')
        
        const data = await response.json()

        console.log('Fetched user:', data)

        // map to StudentCardProps[]
        const mappedStudents: StudentCardProps[] = data.map((user: ApiUser) => ({
          name: user.name,
          role: user.company.bs ?? 'Unknown',
          batch: 3,
          isEnrolled: true,
          rating: 0,
          skills: []
        }))

        setStudentsState(mappedStudents)

      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            return
          }
          setApiError(error.message)
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchUser()

    return () => {
      abortController.abort()
    }
    
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (apiError) {
    return <p>Error: {apiError}</p>
  }

  return (
    <>

      {/* Header component */}
      <Header />

      {/* toggle button */}
      <div style={{ margin: '1rem 0', padding: '1rem' }}>
        <button onClick={() => setShowDetails(prev => !prev)}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        {/* lorem ipsum */}
        {showDetails && <p>Aliquip qui adipisicing velit ex qui in irure. In voluptate labore in duis exercitation nisi. In reprehenderit id fugiat ut anim esse consectetur. Anim commodo exercitation velit mollit proident consectetur fugiat aliqua velit labore ipsum qui. Aliquip aute aute reprehenderit laboris reprehenderit velit labore aute aute. In quis laborum pariatur ipsum nulla duis est. Veniam minim ullamco do dolor tempor sit.</p>}
      </div>

      {/* counter */}
      <div style={{ margin: '1rem 0' }}>
        <button onClick={() => setCounter(prev => prev + 1)}>
          Increment Counter
        </button>
        <p>Counter: {counter}</p>
      </div>

      {/* implementation of immutable form data pattern */}
      <div style={{ margin: '1rem 0', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Masukkan nama mahasiswa..."
          ></input>
        <input
          type="text"
          value={formData.role}
          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
          placeholder="Masukkan Role"
          ></input>
        <input
          type="number"
          value={formData.batch}
          onChange={(e) => setFormData(prev => ({ ...prev, batch: e.target.value == '' ? '' : Number(e.target.value) }))}
          placeholder="Masukkan Batch"
          ></input>
        <input
          type="text"
          value={formData.skills.join(',')}
          onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value.split(',') }))}
          placeholder="Masukkan Skill Kamu (pisahkan dengan koma)"
          ></input>
      </div>

      {/* button add */}
      <button onClick={handleAddStudent}>
        Add Student
      </button>
      
      <h3>Daftar Peserta Bootcamp</h3>

      {/* search text field */}

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search students by name..."
      />

      {/* flex container for student cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        { filteredStudents.map((student) => (
          <StudentCard
            key={student.name}
            name={student.name}
            role={student.role}
            batch={student.batch}
            isEnrolled={student.isEnrolled}
            skills={student.skills}
            rating={student.rating}
          >
            <button onClick={() => handleDeleteStudent(student.name)}>Delete</button>
            <p>Additional info about {student.name}</p>
          </StudentCard>
        ))}
      </div>

      {/* spacer */}
      <div style={{ height: '2rem' }}></div>

      <p style={{ margin: 0, fontSize: '0.85rem', color: '#0284c7' }}>
        🎯 <em>History Pembelajaran</em>
      </p>

      {/* Tampilan Markdown Terformat & Collapsible (Bisa di-Hide/Show) */}
      <MarkdownViewer
        title="Catatan Progress: Hari 3 - Side Effects, useEffect, API Fetching & Derived State (Rabu, 30 Sep 2026)"
        content={progressMarkdownDay3}
        defaultOpen={true}
      />

      <MarkdownViewer
        title="Catatan Progress: Hari 2 - State Fundamental, Immutability & Interaktivitas useState (Selasa, 29 Sep 2026)"
        content={progressMarkdownDay2}
        defaultOpen={false}
      />

      <MarkdownViewer
        title="Catatan Progress: Hari 1 - Setup Vite, TSX & Modular Components (Senin, 28 Sep 2026)"
        content={progressMarkdownDay1}
        defaultOpen={false}
      />

    </>
  )
}

export default App
