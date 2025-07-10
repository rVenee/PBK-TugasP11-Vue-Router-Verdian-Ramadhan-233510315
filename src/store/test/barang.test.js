import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBarangStore } from '../barang'
import axios from 'axios'

vi.mock('axios')

describe('barangStore', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useBarangStore()
  })

  it('mengisi daftarBarang setelah fetchBarang', async () => {
    const mockBarang = [
      {
        "id": "17",
        "kode": "BRG017",
        "nama": "Gitar Akustik Yamaha F310",
        "kategori": "Alat Musik",
        "stok": 5,
        "harga": 750000
      }
    ]

    axios.get.mockResolvedValue({ data: mockBarang })

    await store.fetchBarang()

    expect(store.daftarBarang.length).toBe(1)
    expect(store.daftarBarang[0].nama).toBe('Gitar Akustik Yamaha F310')
    expect(store.loading).toBe(false)
    expect(store.error).toBe(null)
  })
})
