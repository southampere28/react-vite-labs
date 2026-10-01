// Model Data Mahasiswa (Mewakili entitas nyata dari Database / API)
export interface Student {
  id: number
  name: string
  role: string
  batch: number
  isEnrolled: boolean
  rating: number
  skills: string[]
}
