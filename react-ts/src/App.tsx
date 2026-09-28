import { Header } from './components/Header'
import './App.css'
import { StudentCard, type StudentCardProps } from './components/StudentCard'
import progressMarkdown from '../../docs/progress/minggu-01/PROGRESS_HARI_01.md?raw'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function App() {

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

  return (
    <>

      {/* Header component */}
      <Header />

      <h3>Daftar Peserta Bootcamp</h3>

      {/* flex container for student cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        {students.map((student) => (
          <StudentCard
            key={student.name}
            name={student.name}
            role={student.role}
            batch={student.batch}
            isEnrolled={student.isEnrolled}
            skills={student.skills}
            rating={student.rating}
          >
            <p>Additional info about {student.name}</p>
          </StudentCard>
        ))}
      </div>

      {/* spacer */}
      <div style={{ height: '2rem' }}></div>

      <p style={{ margin: 0, fontSize: '0.85rem', color: '#0284c7' }}>
        🎯 <em>Target: Menyelesaikan Mini Project 1 & 2 serta siap Maganghub!</em>
      </p>

      {/* Tampilan Rendered Markdown Progress Hari 1 */}
      <section style={{
        marginTop: '2.5rem',
        marginBottom: '3rem',
        backgroundColor: '#ffffff',
        padding: '2rem 2.5rem',
        borderRadius: '12px',
        border: '1px solid #cbd5e1',
        maxWidth: '850px',
        marginInline: 'auto',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.08)'
      }}>
        <div className="markdown-content">
          <Markdown remarkPlugins={[remarkGfm]}>
            {progressMarkdown}
          </Markdown>
        </div>
      </section>

    </>
  )
}

export default App
