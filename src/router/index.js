import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/Dashboard.vue"
import InventoryView from "../views/DaftarBarang.vue"
import TransactionView from "../views/Transaksi.vue"
import HistoryView from "../views/RiwayatStok.vue"
import ManageUserView from "../views/ManajemenPengguna.vue"
import ProfileView from "../views/Profile.vue"


const routes = [
    { path:'', component: DashboardView },
    { path:'/daftarbarang', component: InventoryView },
    { path:'/transaksi', component: TransactionView },
    { path:'/riwayatstok', component: HistoryView },
    { path:'/manajemenpengguna', component: ManageUserView },
    { path:'/profile', component: ProfileView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
