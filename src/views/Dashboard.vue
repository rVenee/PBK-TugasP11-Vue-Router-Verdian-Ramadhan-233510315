<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const barang = ref([])
const penjualan = ref([])

const totalBarang = ref(0)
const totalStok = ref(0)
const totalTransaksi = ref(0)
const totalPendapatan = ref(0)
const currentDate = ref('')

const fetchData = async () => {
  const resBarang = await axios.get('http://localhost:3000/barang')
  const resPenjualan = await axios.get('http://localhost:3000/penjualan')

  barang.value = resBarang.data
  penjualan.value = resPenjualan.data

  totalBarang.value = barang.value.length
  totalStok.value = barang.value.reduce((sum, b) => sum + b.stok, 0)
  totalTransaksi.value = penjualan.value.length

  totalPendapatan.value = penjualan.value.reduce((sum, t) => {
    const barangTerkait = barang.value.find(b => b.id === t.barangId)
    const harga = barangTerkait ? barangTerkait.harga : 0
    return sum + (t.jumlah * harga)
  }, 0)

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  currentDate.value = new Date().toLocaleDateString('id-ID', options)
}

onMounted(fetchData)
</script>

<template>
  <main class="dashboard">
    <div class="header-bar">
      <img src="../assets/profilep.jpg" alt="profile" class="profile" />
      <div>
        <h2>Hi, Verdian</h2>
        <p>{{ currentDate }}</p>
      </div>
    </div>

    <h1>Dashboard</h1>

    <div class="card-grid">
      <div class="card">
        <div class="card-content">
          <div>
            <h3>Total Barang</h3>
            <p>{{ totalBarang }}</p>
          </div>
          <div class="icon-box">
            <span class="material-icons">inventory_2</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-content">
          <div>
            <h3>Total Stok</h3>
            <p>{{ totalStok }}</p>
          </div>
          <div class="icon-box">
            <span class="material-icons">storage</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-content">
          <div>
            <h3>Total Transaksi</h3>
            <p>{{ totalTransaksi }}</p>
          </div>
          <div class="icon-box">
            <span class="material-icons">shopping_cart</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-content">
          <div>
            <h3>Total Pendapatan</h3>
            <p>Rp {{ totalPendapatan.toLocaleString('id-ID') }}</p>
          </div>
          <div class="icon-box">
            <span class="material-icons">payments</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.dashboard {
  padding: 32px;
  padding-left: 64px;
  background: #f9fafb;
  min-height: 100vh;
}

.header-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.header-bar h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #3d95fb;
}

.header-bar p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.profile {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 0.2s ease;
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.icon-box {
  font-size: 86px;
  color: #d2e5fb;
}

.material-icons {
  font-size: 86px;
}

.card:hover {
  transform: scale(1.02);
}

.card h3 {
  font-size: 18px;
  color: #444;
  margin-bottom: 10px;
}

.card p {
  font-size: 30px;
  font-weight: bold;
  color: #3d95fb;
}
</style>
