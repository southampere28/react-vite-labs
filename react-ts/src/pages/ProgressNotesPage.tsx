import { MarkdownViewer } from '../components/MarkdownViewer'
import progressMarkdownDay1 from '../../../docs/progress/minggu-01/PROGRESS_HARI_01.md?raw'
import progressMarkdownDay2 from '../../../docs/progress/minggu-01/PROGRESS_HARI_02.md?raw'
import progressMarkdownDay3 from '../../../docs/progress/minggu-01/PROGRESS_HARI_03.md?raw'
import progressMarkdownDay4 from '../../../docs/progress/minggu-01/PROGRESS_HARI_04.md?raw'
import progressMarkdownDay5 from '../../../docs/progress/minggu-01/PROGRESS_HARI_05.md?raw'
import progressMarkdownDay6 from '../../../docs/progress/minggu-01/PROGRESS_HARI_06.md?raw'
import progressMarkdownDay7 from '../../../docs/progress/minggu-01/PROGRESS_HARI_07.md?raw'
import progressMarkdownDay8 from '../../../docs/progress/minggu-02/PROGRESS_HARI_08.md?raw'

export function ProgressNotesPage() {
  return (
    <div style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#38bdf8', marginBottom: '1.5rem' }}>📚 Arsip Catatan Progress Belajar</h2>

      <MarkdownViewer
        title="Catatan Progress: Hari 8 - Integrasi Backend Laravel REST API & Otentikasi Sanctum (Senin, 5 Okt 2026)"
        content={progressMarkdownDay8}
        defaultOpen={true}
      />

      <MarkdownViewer
        title="Catatan Progress: Hari 7 - Optimasi Build Produksi, Deployment Mini Project 1 & Portofolio GitHub (Minggu, 4 Okt 2026)"
        content={progressMarkdownDay7}
        defaultOpen={false}
      />

      <MarkdownViewer
        title="Catatan Progress: Hari 6 - Global State Management Zustand, Persistensi LocalStorage & Mini Project 1 (Sabtu, 3 Okt 2026)"
        content={progressMarkdownDay6}
        defaultOpen={false}
      />

      <MarkdownViewer
        title="Catatan Progress: Hari 5 - Styling Tailwind CSS v4, Reusable UI Primitives & Responsive Layout (Jumat, 2 Okt 2026)"
        content={progressMarkdownDay5}
        defaultOpen={false}
      />

      <MarkdownViewer
        title="Catatan Progress: Hari 4 - Routing Modern react-router-dom, Nested Layout & Dynamic Routes (Kamis, 1 Okt 2026)"
        content={progressMarkdownDay4}
        defaultOpen={false}
      />

      <MarkdownViewer
        title="Catatan Progress: Hari 3 - Side Effects, useEffect, API Fetching & Derived State (Rabu, 30 Sep 2026)"
        content={progressMarkdownDay3}
        defaultOpen={false}
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
    </div>
  )
}
