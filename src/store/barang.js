import { defineStore } from 'pinia'
import axios from 'axios'

export const useBarangStore = defineStore('barang', {
  state: () => ({
    daftarBarang: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchBarang() {
      this.loading = true
      try {
        const res = await axios.get('http://localhost:3000/barang')
        this.daftarBarang = res.data
      } catch (err) {
        this.error = 'Gagal mengambil data'
      } finally {
        this.loading = false
      }
    }
  }
})
