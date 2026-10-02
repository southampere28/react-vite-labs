import type { ReactNode } from 'react'
import { Badge } from './ui/Badge'

// 1. Model Props khusus untuk tampilan komponen kartu
export interface StudentCardProps {
  name: string
  role: string
  batch: number
  isEnrolled: boolean
  skills: string[]
  rating: number
  children?: ReactNode
}

// 2. Komponen StudentCard adaptif (Light & Dark mode sesuai referensi)
export function StudentCard({
  name,
  role,
  batch,
  isEnrolled,
  skills,
  rating,
  children
}: StudentCardProps) {
  const isTopStudent = rating === 5

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
      {/* Header Kartu: Nama & Badges */}
      <div className="flex justify-between items-start gap-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {name}
        </h2>

        <div className="flex flex-wrap items-center gap-1.5 justify-end">
          {isTopStudent && (
            <Badge variant="info">
              ⭐ Top Student
            </Badge>
          )}
          <Badge variant={isEnrolled ? "success" : "warning"}>
            {isEnrolled ? "Aktif" : "Non-Aktif"}
          </Badge>
        </div>
      </div>

      {/* Deskripsi Peran & Batch */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        <strong className="text-gray-800 dark:text-gray-200">Peran:</strong> {role} (Batch {batch})
      </p>

      {/* Keahlian (Skills) dengan Tag Modern */}
      <div className="mt-3.5">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1.5 uppercase tracking-wider">
          Keahlian:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Rating Mahasiswa */}
      <div className="mt-3.5 text-sm text-gray-600 dark:text-gray-400">
        <strong className="text-gray-800 dark:text-gray-200">Rating:</strong> ⭐ {rating}/5
      </div>

      {/* Konten Tambahan (Tombol Aksi dsb) */}
      {children && (
        <div className="mt-5 pt-4 border-t border-dashed border-gray-200 dark:border-gray-700">
          {children}
        </div>
      )}
    </div>
  )
}
