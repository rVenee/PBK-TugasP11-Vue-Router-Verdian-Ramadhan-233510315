<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const penjualan = ref([])
const barang = ref([])
const transaksiGabung = ref([])

const searchQuery = ref('')
const tanggalDari = ref('')
const tanggalSampai = ref('')

const fetchData = async () => {
  const resPenjualan = await axios.get('http://localhost:3000/penjualan')
  const resBarang = await axios.get('http://localhost:3000/barang')

  penjualan.value = resPenjualan.data
  barang.value = resBarang.data

  transaksiGabung.value = penjualan.value.map(t => {
    const item = barang.value.find(b => b.id === t.barangId)
    return {
      id: t.id,
      tanggal: t.tanggal,
      jumlah: t.jumlah,
      namaBarang: item?.nama || 'Tidak ditemukan',
      hargaBarang: item?.harga || 0
    }
  })
}

const transaksiTersaring = computed(() => {
  return transaksiGabung.value.filter(item => {
    const cocokNama = item.namaBarang.toLowerCase().includes(searchQuery.value.toLowerCase())
    const tanggal = new Date(item.tanggal)
    const dari = tanggalDari.value ? new Date(tanggalDari.value) : null
    const sampai = tanggalSampai.value ? new Date(tanggalSampai.value) : null

    const cocokTanggal =
      (!dari || tanggal >= dari) &&
      (!sampai || tanggal <= sampai)

    return cocokNama && cocokTanggal
  })
})

const formatTanggal = (tgl) => {
  const d = new Date(tgl)
  return d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

const hapusTransaksi = async (id) => {
  if (confirm("Yakin ingin menghapus transaksi ini?")) {
    await axios.delete(`http://localhost:3000/penjualan/${id}`)
    await fetchData()
  }
}

onMounted(fetchData)
</script>

<template>
  <main class="riwayat-transaksi">
    <h1>Riwayat Transaksi</h1>

    <div class="filters">
        <div class="filter-group">
            <label for="search">Cari Nama Barang</label>
            <input id="search" type="text" v-model="searchQuery" placeholder="Contoh: Laptop" />
         </div>
        <div class="filter-group">
            <label for="tanggalDari">Dari Tanggal</label>
            <input id="tanggalDari" type="date" v-model="tanggalDari" />
        </div>
        <div class="filter-group">
            <label for="tanggalSampai">Sampai</label>
            <input id="tanggalSampai" type="date" v-model="tanggalSampai" />
        </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Tanggal</th>
          <th>Nama Barang</th>
          <th>Jumlah</th>
          <th>Harga Satuan</th>
          <th>Total Harga</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in transaksiTersaring" :key="index">
          <td>{{ formatTanggal(item.tanggal) }}</td>
          <td>{{ item.namaBarang }}</td>
          <td>{{ item.jumlah }}</td>
          <td>Rp {{ item.hargaBarang.toLocaleString('id-ID') }}</td>
          <td>Rp {{ (item.jumlah * item.hargaBarang).toLocaleString('id-ID') }}</td>
          <td>
            <button @click="hapusTransaksi(item.id)" style="background: #e74c3c; color: white; padding: 6px 12px; border-radius: 6px; cursor: pointer;">
              Hapus
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
.riwayat-transaksi {
  padding: 32px;
  padding-left: 64px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

thead {
  background-color: #f1f5f9;
}

tr:nth-child(even) {
  background-color: #f9fafb;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  margin-bottom: 6px;
  font-weight: 500;
  color: #333;
}

.filter-group input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  width: 200px;
}

</style>
