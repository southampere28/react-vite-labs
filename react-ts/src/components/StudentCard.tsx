
// 1. Define the shape of data type using TypeScript interface
export interface StudentCardProps {
    name: string;
    role: string;
    batch: number;
    isEnrolled: boolean;
    skills: string[];
    rating: number; // 1 - 5
    children?: React.ReactNode; // Prop khusus untuk diapit
}

// 2. Destructure props in the component function
export function StudentCard({
    name,
    role,
    batch,
    isEnrolled,
    skills,
    rating,
    children
}: StudentCardProps) {
    
    const isTopStudent = rating === 5;
    
    return (

        <div style={{
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            padding: '1.25rem',
            maxWidth: '380px',
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textAlign: 'left',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#1e293b' }}>{name}</h2>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {isTopStudent && (
                        <span style={{
                            fontSize: '0.75rem',
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            color: '#000000',
                            fontWeight: 600
                        }}>
                            ⭐ Top Student
                        </span>
                    )}
                    <span style={{
                        fontSize: '0.75rem',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        backgroundColor: isEnrolled ? '#dcfce7' : '#fee2e2',
                        color: isEnrolled ? '#166534' : '#991b1b',
                        fontWeight: 600
                    }}>
                        {isEnrolled ? 'Aktif' : 'Non-Aktif'}
                    </span>
                </div>
            </div>

            <p style={{ margin: '0.5rem 0', color: '#475569' }}>
                <strong>Peran:</strong> {role} (Batch {batch})
            </p>

            {/* Render list menggunakan array .map() dengan KEY unik */}
            <div style={{ marginTop: '0.75rem' }}>
                <strong style={{ fontSize: '0.875rem', color: '#334155' }}>Keahlian:</strong>
                <ul style={{ margin: '0.5rem 0 0 1.25rem', padding: 0 }}>
                    {skills.map((skill, index) => (
                        <li key={index} style={{ color: '#64748b', fontSize: '0.875rem' }}>
                            {skill}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Render rating */}
            <div style={{ marginTop: '0.75rem' }}>
                <strong style={{ fontSize: '0.875rem', color: '#334155' }}>Rating:</strong> {rating}
            </div>

            {/* Render children jika ada konten tambahan */}
            {children && (
                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px dashed #e2e8f0' }}>
                    {children}
                </div>
            )}
        </div>
    );
}