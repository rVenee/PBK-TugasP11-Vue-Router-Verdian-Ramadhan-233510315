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

  await fetchBarang()
}

onMounted(fetchBarang)
</script>

<template>
  <main>
    <h1>Transaksi Penjualan</h1>

    <div class="form-wrapper">
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
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 48px 64px;
  background-color: #f9fafb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.form-wrapper {
  display: flex;
  justify-content: center;
}

.transaksi-form {
  max-width: 700px;
  width: 100%;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-row {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

select,
input[type="number"],
input[type="date"] {
  padding: 14px 16px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: 0.2s;
}

select:focus,
input:focus {
  border-color: #3d95fb;
  outline: none;
  box-shadow: 0 0 0 2px rgba(61, 149, 251, 0.2);
}

button {
  background: #3d95fb;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background: #2c7de4;
}
</style>
