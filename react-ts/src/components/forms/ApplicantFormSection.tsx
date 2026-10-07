import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  applicantSchema,
  applicantTracks,
  type ApplicantFormInput,
} from '../../schemas/applicantSchema'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Textarea } from '../ui/Textarea'
import { Checkbox } from '../ui/Checkbox'
import { Button } from '../ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card'
import { FormStateDebugger } from './FormStateDebugger'
import { CheckCircle2, GraduationCap, RotateCcw, Sparkles } from 'lucide-react'

export function ApplicantFormSection() {
  const [submittedData, setSubmittedData] = useState<ApplicantFormInput | null>(null)

  const defaultValues: ApplicantFormInput = {
    fullName: '',
    email: '',
    portfolioUrl: '',
    yearsOfExperience: 1,
    track: 'fullstack',
    bio: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  }

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid, submitCount },
  } = useForm<ApplicantFormInput>({
    resolver: zodResolver(applicantSchema),
    defaultValues,
    mode: 'onChange',
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const watchedValues = watch()

  const onSubmit = async (data: ApplicantFormInput) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmittedData(data)
  }

  const handlePrefillApplicant = () => {
    reset({
      fullName: 'Pramudya Developer',
      email: 'pramudya.dev@example.com',
      portfolioUrl: 'https://github.com/pramudyacode',
      yearsOfExperience: 2,
      track: 'fullstack',
      bio: 'Memiliki pengalaman integrasi SPA React Vite dengan backend Laravel 12 REST API, state management Zustand, dan styling modern Tailwind CSS.',
      password: 'Password123',
      confirmPassword: 'Password123',
      agreeTerms: true,
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle>Pendaftaran Program DevTalent & Portofolio</CardTitle>
                  <CardDescription>
                    Validasi password match (`.refine`), format URL, dan pakta integritas.
                  </CardDescription>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePrefillApplicant}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Sampel Data</span>
              </Button>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nama Lengkap *"
                  placeholder="Contoh: Budi Santoso"
                  error={errors.fullName?.message}
                  {...register('fullName')}
                />

                <Input
                  label="Alamat Email *"
                  type="email"
                  placeholder="nama@email.com"
                  error={errors.email?.message}
                  {...register('email')}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="URL Portofolio / GitHub *"
                  placeholder="https://github.com/username"
                  error={errors.portfolioUrl?.message}
                  helperText="Wajib format URL dengan https://"
                  {...register('portfolioUrl')}
                />

                <Input
                  label="Pengalaman (Tahun) *"
                  type="number"
                  placeholder="1"
                  error={errors.yearsOfExperience?.message}
                  {...register('yearsOfExperience')}
                />
              </div>
              <Select
                label="Jalur Minat Magang *"
                options={[...applicantTracks]}
                error={errors.track?.message}
                {...register('track')}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200/80 dark:border-gray-700/60">
                <Input
                  label="Kata Sandi Akun *"
                  type="password"
                  placeholder="Min 8 karakter (1 huruf besar, 1 angka)"
                  error={errors.password?.message}
                  {...register('password')}
                />

                <Input
                  label="Konfirmasi Kata Sandi *"
                  type="password"
                  placeholder="Ulangi kata sandi di atas"
                  error={errors.confirmPassword?.message}
                  helperText="Divalidasi via Zod .refine()"
                  {...register('confirmPassword')}
                />
              </div>

              <Textarea
                label="Motivasi & Deskripsi Singkat *"
                placeholder="Jelaskan ringkasan proyek yang pernah dibuat dan komitmen..."
                rows={3}
                error={errors.bio?.message}
                helperText="Minimal 15 karakter"
                {...register('bio')}
              />

              <div className="pt-1">
                <Checkbox
                  label="Saya Menyetujui Pakta Integritas & Kebijakan Program Karir"
                  description="Menyatakan kesediaan mengikuti seluruh modul intensif sampai tuntas."
                  error={errors.agreeTerms?.message}
                  {...register('agreeTerms')}
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={() => {
                  reset(defaultValues)
                  setSubmittedData(null)
                }}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Form</span>
              </Button>

              <Button
                type="submit"
                variant="success"
                size="md"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                <span>🚀 Kirim Pendaftaran</span>
              </Button>
            </CardFooter>
          </form>
        </Card>

        {submittedData && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 animate-fadeIn">
            <div className="flex items-center gap-2 font-bold mb-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Registrasi Pelamar Berhasil Diterima!</span>
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              Kandidat &quot;<strong>{submittedData.fullName}</strong>&quot; ({submittedData.email}) dengan jalur &quot;{submittedData.track}&quot; telah tervalidasi runtime dengan aman.
            </p>
          </div>
        )}
      </div>

      <div className="lg:col-span-5 flex flex-col">
        <FormStateDebugger
          title="Applicant Form Inspector"
          isDirty={isDirty}
          isValid={isValid}
          isSubmitting={isSubmitting}
          submitCount={submitCount}
          errors={errors}
          watchedValues={watchedValues}
        />
      </div>
    </div>
  )
}

