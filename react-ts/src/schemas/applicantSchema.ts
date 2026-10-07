import { z } from 'zod'

export const applicantTracks = [
  { value: 'frontend', label: '⚛️ Frontend Specialist (React / Next.js / Tailwind)' },
  { value: 'backend', label: '🐘 Backend Specialist (Laravel / PHP / PostgreSQL)' },
  { value: 'fullstack', label: '🚀 Fullstack Developer (React + Laravel Sanctum)' },
  { value: 'mobile', label: '📱 Mobile Engineer (React Native)' },
] as const

export const applicantSchema = z
  .object({
    fullName: z
      .string()
      .min(3, 'Nama lengkap minimal 3 karakter')
      .max(60, 'Nama lengkap maksimal 60 karakter'),

    email: z.string().email('Format email tidak valid'),

    portfolioUrl: z
      .string()
      .url('Harus berupa URL web yang valid (contoh: https://github.com/username)'),

    yearsOfExperience: z.coerce
      .number({ invalid_type_error: 'Pengalaman harus berupa angka' })
      .min(0, 'Pengalaman minimal 0 tahun')
      .max(40, 'Maksimal 40 tahun'),

    track: z.enum(['frontend', 'backend', 'fullstack', 'mobile'], {
      required_error: 'Pilih jalur keahlian program kerja',
      invalid_type_error: 'Pilih jalur keahlian program kerja',
    }),

    bio: z
      .string()
      .min(15, 'Ceritakan motivasi dan keahlian Anda minimal 15 karakter')
      .max(600, 'Maksimal 600 karakter'),

    password: z
      .string()
      .min(8, 'Password akun minimal 8 karakter')
      .regex(/[A-Z]/, 'Password harus memiliki minimal 1 huruf kapital')
      .regex(/[0-9]/, 'Password harus memiliki minimal 1 angka'),

    confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),

    agreeTerms: z.boolean().refine((val) => val === true, {
      message: 'Anda harus menyetujui pakta integritas dan ketentuan program karir',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok dengan password yang dimasukkan',
    path: ['confirmPassword'],
  })

export type ApplicantFormInput = z.infer<typeof applicantSchema>
