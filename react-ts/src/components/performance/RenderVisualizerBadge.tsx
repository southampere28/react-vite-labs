import { useRef, useEffect } from 'react'

interface RenderVisualizerBadgeProps {
  label?: string
}

/**
 * Komponen pembantu yang menghitung berapa kali komponen di-commit ke DOM
 * dan memberikan visual flash tanpa membaca/menulis ref pada render phase.
 */
export function RenderVisualizerBadge({ label = 'Renders' }: RenderVisualizerBadgeProps) {
  const badgeRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const countRef = useRef(1)

  useEffect(() => {
    countRef.current += 1
    if (textRef.current) {
      textRef.current.textContent = `${label}: ${countRef.current}x`
    }
    if (badgeRef.current) {
      badgeRef.current.classList.add('bg-amber-400', 'text-amber-950', 'scale-110')
      const timer = setTimeout(() => {
        badgeRef.current?.classList.remove('bg-amber-400', 'text-amber-950', 'scale-110')
      }, 350)
      return () => clearTimeout(timer)
    }
  })

  return (
    <span
      ref={badgeRef}
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold transition-all duration-300 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      <span ref={textRef}>{label}: 1x</span>
    </span>
  )
}

