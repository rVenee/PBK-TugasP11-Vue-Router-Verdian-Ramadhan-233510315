import { defineStore } from 'pinia'
import axios from 'axios'

export const usePenjualanStore = defineStore('penjualan', {
  state: () => ({
    dataPenjualan: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchPenjualan() {
      this.loading = true
      try {
        const res = await axios.get('http://localhost:3000/penjualan')
        this.dataPenjualan = res.data
        this.error = null
      } catch (err) {
        this.error = 'Gagal mengambil data penjualan'
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }
})
