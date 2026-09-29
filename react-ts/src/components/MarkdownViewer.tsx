import { useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export interface MarkdownViewerProps {
  title: string
  content: string
  defaultOpen?: boolean
}

export function MarkdownViewer({ title, content, defaultOpen = false }: MarkdownViewerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen)

  return (
    <section className="markdown-viewer-card">
      <div 
        className="markdown-viewer-header" 
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen((prev) => !prev)
          }
        }}
      >
        <div className="markdown-viewer-title-group">
          <span className="markdown-icon">📄</span>
          <h3 className="markdown-viewer-title">{title}</h3>
        </div>
        <button
          type="button"
          className="markdown-toggle-button"
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen((prev) => !prev)
          }}
          aria-expanded={isOpen}
        >
          {isOpen ? '👁️ Sembunyikan' : '👁️ Tampilkan'}
        </button>
      </div>

      {isOpen && (
        <div className="markdown-viewer-body">
          <div className="markdown-content">
            <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
          </div>
        </div>
      )}
    </section>
  )
}
