<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const barang = ref([])
const searchQuery = ref('')

const form = ref({
  kode: '',
  nama: '',
  kategori: '',
  stok: null,
  harga: null
})

const isEdit = ref(false)
const editId = ref(null)

const fetchBarang = async () => {
  try {
    const res = await axios.get('http://localhost:3000/barang')
    barang.value = res.data
  } catch (err) {
    console.error('Gagal memuat data barang:', err)
  }
}
onMounted(fetchBarang)

const handleSubmit = async () => {
  if (!form.value.kode || !form.value.nama || !form.value.kategori) return

  if (isEdit.value) {
    await axios.put(`http://localhost:3000/barang/${editId.value}`, {
      ...form.value,
      id: editId.value
    })
  } else {
    await axios.post('http://localhost:3000/barang', form.value)
  }

  await fetchBarang()
  resetForm()
}

const edit = (item) => {
  isEdit.value = true
  editId.value = item.id
  form.value = { ...item }
}

const hapus = async (id) => {
  await axios.delete(`http://localhost:3000/barang/${id}`)
  await fetchBarang()
}

const resetForm = () => {
  isEdit.value = false
  editId.value = null
  form.value = {
    kode: '',
    nama: '',
    kategori: '',
    stok: null,
    harga: null
  }
}

const filteredBarang = computed(() =>
  barang.value.filter(item =>
    item.nama.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)
</script>

<template>
  <main>
    <h1>Daftar Barang</h1>

    <form @submit.prevent="handleSubmit" class="form-barang">
      <div class="form-row">
        <label for="kode">Kode Barang</label>
        <input id="kode" v-model="form.kode" type="text" required />
      </div>
      <div class="form-row">
        <label for="nama">Nama Barang</label>
        <input id="nama" v-model="form.nama" type="text" required />
      </div>
      <div class="form-row">
        <label for="kategori">Kategori</label>
        <input id="kategori" v-model="form.kategori" type="text" required />
      </div>
      <div class="form-row">
        <label for="stok">Stok</label>
        <input id="stok" v-model.number="form.stok" type="number" required />
      </div>
      <div class="form-row">
        <label for="harga">Harga</label>
        <input id="harga" v-model.number="form.harga" type="number" required />
      </div>

      <div class="form-actions">
        <button type="submit">{{ isEdit ? 'Simpan Perubahan' : 'Tambah Barang' }}</button>
        <button v-if="isEdit" type="button" @click="resetForm" class="cancel">Batal</button>
      </div>
    </form>

    <input
      type="text"
      v-model="searchQuery"
      placeholder="Cari nama barang..."
      class="search-input"
    />

    <table>
      <thead>
        <tr>
          <th>Kode</th>
          <th>Nama Barang</th>
          <th>Kategori</th>
          <th>Stok</th>
          <th>Harga</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredBarang" :key="item.id">
          <td>{{ item.kode }}</td>
          <td>{{ item.nama }}</td>
          <td>{{ item.kategori }}</td>
          <td>{{ item.stok }}</td>
          <td>Rp {{ item.harga.toLocaleString('id-ID') }}</td>
          <td>
            <div class="aksi-button">
              <button class="edit-btn" @click="edit(item)">Edit</button>
              <button class="delete-btn" @click="hapus(item.id)">Hapus</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
main {
  padding: 32px;
  padding-left: 64px;
}

.form-barang {
  max-width: 100%;
  margin-bottom: 24px;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-row {
  margin-bottom: 16px;
}

.form-row label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #333;
}

.form-row input {
  padding: 10px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 26px;
}

button {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

button[type="submit"] {
  background-color: #3d95fb;
  color: white;
}

button.cancel {
  background-color: #ddd;
  color: #333;
}

button.cancel:hover {
  background-color: #bbb;
}

.search-input {
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 10px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

thead {
  background-color: #f5f9fc;
}

tr:nth-child(even) {
  background-color: #f8f8f8;
}

.aksi-button {
  display: flex;
  gap: 8px;
}

.edit-btn {
  background-color: #3d95fb;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.edit-btn:hover {
  background-color: #256ec1;
}

.delete-btn:hover {
  background-color: #c0392b;
}
</style>
