export function Header() {
  const todayDate = new Date().toLocaleDateString(
    'id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
  );
  
    return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
      <h1 style={{ margin: '1rem 1rem 1rem 1rem', color: '#b4cd27' }}>Dashboard Belajar React</h1>
      <p style={{ margin: '0.25rem 0 0 0', color: '#64748b' }}>{todayDate}</p>
    </header>
  )
}