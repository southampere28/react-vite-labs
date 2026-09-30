
import { useEffect, useState } from 'react'


export function Header() {

  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString())

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Timer tick')
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(timer)
  }, [])
  
    return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
      <h1 style={{ margin: '1rem 1rem 1rem 1rem', color: '#b4cd27' }}>Dashboard Belajar React</h1>
      <p style={{ margin: '0.25rem 0 0 0', color: '#64748b' }}>{currentTime}</p>
    </header>
  )
}