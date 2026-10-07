import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ProductFormInput } from '../schemas/productSchema'

/**
 * Model produk yang tersimpan di Inventory.
 * Menggabungkan seluruh field dari skema Zod (ProductFormInput)
 * ditambah atribut sistem: id unik & timestamp.
 */
export interface InventoryProduct extends ProductFormInput {
  id: string
  createdAt: string
  updatedAt?: string
}

// Data awal contoh agar saat pertama kali dibuka tidak kosong melompong
const SAMPLE_PRODUCTS: InventoryProduct[] = [
  {
    id: 'inv-sample-1',
    name: 'Mechanical Keyboard RGB Wireless',
    sku: 'PRD-KEYB01',
    category: 'electronics',
    costPrice: 650000,
    sellingPrice: 950000,
    stock: 24,
    weightKg: 0.95,
    status: 'published',
    description: 'Keyboard mekanikal hot-swappable dengan switch gateron brown dan koneksi tri-mode.',
    warrantyIncluded: true,
    createdAt: '2026-10-06T10:00:00.000Z',
  },
  {
    id: 'inv-sample-2',
    name: 'Hoodie Oversized Heavyweight Cotton',
    sku: 'PRD-HOOD02',
    category: 'fashion',
    costPrice: 150000,
    sellingPrice: 285000,
    stock: 50,
    weightKg: 0.6,
    status: 'published',
    description: 'Hoodie katun fleece premium 330 gsm dengan jahitan rapi tahan lama.',
    warrantyIncluded: false,
    createdAt: '2026-10-06T11:30:00.000Z',
  },
]

interface InventState {
  // State data produk di localStorage
  products: InventoryProduct[]

  // Action / Method CRUD Lokal
  addProduct: (product: ProductFormInput) => InventoryProduct
  updateProduct: (id: string, updates: Partial<ProductFormInput>) => void
  removeProduct: (id: string) => void
  getProductById: (id: string) => InventoryProduct | undefined
  clearProducts: () => void
  resetToSample: () => void
}

/**
 * Zustand Store untuk Inventory dengan persistensi LocalStorage otomatis.
 * Setiap kali memanggil addProduct / removeProduct / updateProduct,
 * state React dan localStorage ('invent-local-storage') otomatis sinkron.
 */
export const useInventStore = create<InventState>()(
  persist(
    (set, get) => ({
      products: SAMPLE_PRODUCTS,

      // 1. Tambah produk baru (otomatis generate ID & createdAt)
      addProduct: (input) => {
        const newProduct: InventoryProduct = {
          ...input,
          id: `inv-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          products: [newProduct, ...state.products],
        }))

        return newProduct
      },

      // 2. Perbarui data produk berdasarkan ID
      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((item) =>
            item.id === id
              ? { ...item, ...updates, updatedAt: new Date().toISOString() }
              : item
          ),
        }))
      },

      // 3. Hapus produk berdasarkan ID
      removeProduct: (id) => {
        set((state) => ({
          products: state.products.filter((item) => item.id !== id),
        }))
      },

      // 4. Cari produk berdasarkan ID
      getProductById: (id) => {
        return get().products.find((item) => item.id === id)
      },

      // 5. Kosongkan seluruh data inventory lokal
      clearProducts: () => {
        set({ products: [] })
      },

      // 6. Kembalikan ke sample awal
      resetToSample: () => {
        set({ products: SAMPLE_PRODUCTS })
      },
    }),
    {
      name: 'invent-local-storage', // Kunci di browser LocalStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
)
