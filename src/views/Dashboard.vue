<template>
  <main class="dashboard">
    <h1>Dashboard</h1>

    <div class="card-container">
      <div class="card">
        <h2>Total Barang</h2>
        <p>{{ totalBarang }}</p>
      </div>
      <div class="card">
        <h2>Total Stok</h2>
        <p>{{ totalStok }}</p>
      </div>
      <div class="card">
        <h2>Total Transaksi</h2>
        <p>{{ totalTransaksi }}</p>
      </div>
      <div class="card">
        <h2>Total Pendapatan</h2>
        <p>Rp {{ totalPendapatan.toLocaleString('id-ID') }}</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const barang = ref([])
const penjualan = ref([])

const totalBarang = ref(0)
const totalStok = ref(0)
const totalTransaksi = ref(0)
const totalPendapatan = ref(0)

const fetchData = async () => {
  const resBarang = await axios.get('http://localhost:3000/barang')
  const resPenjualan = await axios.get('http://localhost:3000/penjualan')

  barang.value = resBarang.data
  penjualan.value = resPenjualan.data

  totalBarang.value = barang.value.length
  totalStok.value = barang.value.reduce((sum, b) => sum + b.stok, 0)
  totalTransaksi.value = penjualan.value.length

  // Hitung pendapatan dari penjualan x harga satuan
  totalPendapatan.value = penjualan.value.reduce((sum, t) => {
    const barangTerkait = barang.value.find(b => b.id === t.barangId)
    const harga = barangTerkait ? barangTerkait.harga : 0
    return sum + (t.jumlah * harga)
  }, 0)
}

onMounted(fetchData)
</script>

<style scoped>
.dashboard {
  padding: 32px;
  padding-left: 64px;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.card {
  flex: 1 1 200px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.card h2 {
  font-size: 16px;
  color: #666;
  margin-bottom: 8px;
}
.card p {
  font-size: 24px;
  font-weight: bold;
  color: #3d95fb;
}
</style>
