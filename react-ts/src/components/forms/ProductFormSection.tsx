import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useInventStore } from '../../store/useInventStore'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  productSchema,
  productCategories,
  productStatuses,
  type ProductFormInput,
} from '../../schemas/productSchema'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Textarea } from '../ui/Textarea'
import { Checkbox } from '../ui/Checkbox'
import { Button } from '../ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card'
import { FormStateDebugger } from './FormStateDebugger'
import { CheckCircle2, PackagePlus, RotateCcw, Sparkles } from 'lucide-react'

const DEFAULT_PRODUCT_VALUES: ProductFormInput = {
  name: '',
  sku: '',
  category: 'electronics',
  costPrice: 0,
  sellingPrice: 0,
  stock: 10,
  weightKg: 0.5,
  status: 'draft',
  description: '',
  warrantyIncluded: true,
}

export function ProductFormSection() {
  const [submittedData, setSubmittedData] = useState<ProductFormInput | null>(null)
  const addProduct = useInventStore((state) => state.addProduct)
  const products = useInventStore((state) => state.products)
  const removeProduct = useInventStore((state) => state.removeProduct)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors, isSubmitting, isDirty, isValid, submitCount, isSubmitSuccessful },
  } = useForm<ProductFormInput>({
    resolver: zodResolver(productSchema),
    defaultValues: DEFAULT_PRODUCT_VALUES,
    mode: 'onChange',
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(DEFAULT_PRODUCT_VALUES)

      // allert
      alert('Produk berhasil ditambahkan!')
    }
  }, [isSubmitSuccessful, reset])

  // eslint-disable-next-line react-hooks/incompatible-library
  const watchedValues = watch()

  const onSubmit = async (data: ProductFormInput) => {
    try {
      // 1. Cek duplikasi SKU manual (contoh skenario gagal)
      const isSkuExist = useInventStore.getState().products.some((p) => p.sku === data.sku)
      if (isSkuExist) {
        // Tempelkan error langsung ke field 'sku' di form!
        setError('sku', {
          type: 'manual',
          message: 'Kode SKU ini sudah digunakan oleh produk lain!!!',
        })
        return // Batalkan submit
      }

      // 2. Coba simpan ke LocalStorage / Zustand
      addProduct(data)

    } catch (error) {
      console.error('Penyimpanan gagal:', error)

      // Tempelkan error umum di level form (root error)
      setError('root', {
        type: 'manual',
        message: 'Gagal menyimpan ke penyimpanan lokal. Memori browser penuh!',
      })
    }
  }

  const handlePrefillDummy = () => {
    reset({
      name: 'Wireless Mechanical Keyboard RGB',
      sku: 'PRD-TECH99',
      category: 'electronics',
      costPrice: 450000,
      sellingPrice: 750000,
      stock: 25,
      weightKg: 0.85,
      status: 'published',
      description: 'Keyboard nirkabel dengan switch mechanical linear dan koneksi Bluetooth 5.2.',
      warrantyIncluded: true,
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                  <PackagePlus className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle>Inventaris Produk & Transaksi</CardTitle>
                  <CardDescription>
                    Formulir dengan validasi cross-field Zod (Harga Jual ≥ Modal, Regex SKU).
                  </CardDescription>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePrefillDummy}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Contoh Data</span>
              </Button>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <Input
                label="Nama Produk *"
                placeholder="Contoh: Mechanical Keyboard TKL"
                error={errors.name?.message}
                helperText="Minimal 3 dan maksimal 100 karakter"
                {...register('name')}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Kode SKU Produk *"
                  placeholder="PRD-XXXX (contoh: PRD-MECH01)"
                  error={errors.sku?.message}
                  helperText="Format: diawali PRD- diikuti 4-8 karakter"
                  {...register('sku')}
                />

                <Select
                  label="Kategori *"
                  options={[...productCategories]}
                  error={errors.category?.message}
                  {...register('category')}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200/80 dark:border-gray-700/60">
                <Input
                  label="Harga Modal (Rp) *"
                  type="number"
                  placeholder="0"
                  error={errors.costPrice?.message}
                  helperText="Nilai modal dasar (z.coerce.number)"
                  {...register('costPrice')}
                />

                <Input
                  label="Harga Jual (Rp) *"
                  type="number"
                  placeholder="0"
                  error={errors.sellingPrice?.message}
                  helperText="Harus ≥ harga modal (Zod .refine)"
                  {...register('sellingPrice')}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Stok Barang *"
                  type="number"
                  placeholder="10"
                  error={errors.stock?.message}
                  {...register('stock')}
                />

                <Input
                  label="Berat (kg) *"
                  type="number"
                  step="0.01"
                  placeholder="0.5"
                  error={errors.weightKg?.message}
                  {...register('weightKg')}
                />

                <Select
                  label="Status Publikasi *"
                  options={[...productStatuses]}
                  error={errors.status?.message}
                  {...register('status')}
                />
              </div>

              <Textarea
                label="Deskripsi Lengkap Produk *"
                placeholder="Tuliskan spesifikasi, keunggulan, atau kelengkapan..."
                rows={3}
                error={errors.description?.message}
                helperText="Minimal 10 karakter"
                {...register('description')}
              />

              <div className="pt-1">
                <Checkbox
                  label="Sertakan Garansi Resmi Toko / Distributor"
                  description="Memberikan proteksi retur & perbaikan selama 12 bulan"
                  error={errors.warrantyIncluded?.message}
                  {...register('warrantyIncluded')}
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={() => {
                  reset(DEFAULT_PRODUCT_VALUES)
                  setSubmittedData(null)
                }}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Form</span>
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                <span>💾 Simpan Produk (Submit)</span>
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Check if already submitted by listen addProduct from useInventStore */}
        {submittedData && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 animate-fadeIn">
            <div className="flex items-center gap-2 font-bold mb-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Produk Berhasil Divalidasi & Disimpan ke Mock Database!</span>
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              Payload produk &quot;<strong>{submittedData.name}</strong>&quot; (SKU: {submittedData.sku}) telah lolos validasi runtime Zod dan siap dikirim via Axios ke Laravel REST API.
            </p>
          </div>
        )}

      </div>

      <div className="lg:col-span-5 flex flex-col">
        <FormStateDebugger
          title="Product Form Inspector"
          isDirty={isDirty}
          isValid={isValid}
          isSubmitting={isSubmitting}
          submitCount={submitCount}
          errors={errors}
          watchedValues={watchedValues}
        />
      </div>

      {/* Daftar Produk di LocalStorage */}
      <div className="lg:col-span-7">
        <h3 className="text-lg font-bold mb-3">
          Daftar Inventaris Tersimpan ({products.length})
        </h3>

        <div className="space-y-2">
          {products.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border rounded-lg"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-gray-500">
                  SKU: {item.sku} | Stok: {item.stock} | Rp {item.sellingPrice.toLocaleString('id-ID')}
                </p>
              </div>

              <button
                onClick={() => removeProduct(item.id)}
                className="text-red-500 text-sm hover:underline cursor-pointer"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

