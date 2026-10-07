import { z } from 'zod'

export const productCategories = [
  { value: 'electronics', label: '⚡ Elektronik & Gadget' },
  { value: 'fashion', label: '👕 Pakaian & Fashion' },
  { value: 'food', label: '🍜 Makanan & Minuman' },
  { value: 'books', label: '📚 Buku & Edukasi' },
  { value: 'automotive', label: '🚗 Otomotif & Aksesoris' },
] as const

export const productStatuses = [
  { value: 'draft', label: '📝 Draft (Belum Tayang)' },
  { value: 'published', label: '🚀 Published (Siap Dijual)' },
  { value: 'archived', label: '📦 Diarsipkan' },
] as const

export const productSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Nama produk minimal 3 karakter')
      .max(100, 'Nama produk maksimal 100 karakter'),

    sku: z
      .string()
      .regex(/^PRD-[A-Z0-9]{4,8}$/, 'Format SKU harus diawali PRD- lalu 4-8 huruf kapital/angka (cth: PRD-TECH01)'),

    category: z.enum(['electronics', 'fashion', 'food', 'books', 'automotive'], {
      required_error: 'Pilih kategori produk yang valid',
      invalid_type_error: 'Pilih kategori produk yang valid',
    }),

    costPrice: z.coerce
      .number({ invalid_type_error: 'Harga modal harus berupa angka' })
      .positive('Harga modal harus lebih dari 0'),

    sellingPrice: z.coerce
      .number({ invalid_type_error: 'Harga jual harus berupa angka' })
      .positive('Harga jual harus lebih dari 0'),

    stock: z.coerce
      .number({ invalid_type_error: 'Stok harus berupa angka' })
      .int('Stok harus bilangan bulat')
      .min(0, 'Stok minimal 0 unit'),

    weightKg: z.coerce
      .number({ invalid_type_error: 'Berat harus berupa angka' })
      .positive('Berat minimal 0.01 kg'),

    status: z.enum(['draft', 'published', 'archived'], {
      required_error: 'Pilih status publikasi yang valid',
      invalid_type_error: 'Pilih status publikasi yang valid',
    }),

    description: z
      .string()
      .min(10, 'Deskripsi produk minimal 10 karakter')
      .max(500, 'Deskripsi maksimal 500 karakter'),

    warrantyIncluded: z.boolean(),
  })
  .refine((data) => data.sellingPrice >= data.costPrice, {
    message: 'Harga jual (Rp) tidak boleh lebih rendah dari harga modal (Rp)',
    path: ['sellingPrice'],
  })

export type ProductFormInput = z.infer<typeof productSchema>
