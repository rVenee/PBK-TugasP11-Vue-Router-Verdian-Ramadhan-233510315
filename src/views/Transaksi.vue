<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const barangList = ref([])
const form = ref({
  barangId: '',
  jumlah: 1,
  tanggal: new Date().toISOString().split('T')[0] // default today
})

const fetchBarang = async () => {
  const res = await axios.get('http://localhost:3000/barang')
  barangList.value = res.data
}

const submitTransaksi = async () => {
  const selectedBarang = barangList.value.find(b => b.id == form.value.barangId)

  if (!selectedBarang) {
    alert("Barang tidak ditemukan")
    return
  }

  if (form.value.jumlah > selectedBarang.stok) {
    alert("Jumlah melebihi stok yang tersedia!")
    return
  }

  await axios.post('http://localhost:3000/penjualan', form.value)

  await axios.put(`http://localhost:3000/barang/${selectedBarang.id}`, {
    ...selectedBarang,
    stok: selectedBarang.stok - form.value.jumlah
  })

  alert('Transaksi berhasil disimpan!')
  form.value.barangId = ''
  form.value.jumlah = 1
  form.value.tanggal = new Date().toISOString().split('T')[0]

  // Refresh barang list untuk update stok terbaru
  await fetchBarang()
}

onMounted(fetchBarang)
</script>

<template>
  <main>
    <h1>Transaksi Penjualan</h1>

    <form @submit.prevent="submitTransaksi" class="transaksi-form">
      <div class="form-row">
        <label>Barang</label>
        <select v-model="form.barangId" required>
          <option disabled value="">-- Pilih Barang --</option>
          <option v-for="item in barangList" :value="item.id" :key="item.id">
            {{ item.nama }}
          </option>
        </select>
      </div>

      <div class="form-row">
        <label>Jumlah</label>
        <input type="number" v-model.number="form.jumlah" min="1" required />
      </div>

      <div class="form-row">
        <label>Tanggal</label>
        <input type="date" v-model="form.tanggal" required />
      </div>

      <button type="submit">Simpan Transaksi</button>
    </form>
  </main>
</template>

<style scoped>
.transaksi-form {
  max-width: 400px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.form-row {
  margin-bottom: 16px;
}

label {
  display: block;
  font-weight: 500;
  margin-bottom: 6px;
}

select,
input[type="number"],
input[type="date"] {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  background: #3d95fb;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
</style>
