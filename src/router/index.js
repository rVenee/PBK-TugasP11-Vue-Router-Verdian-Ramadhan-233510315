import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/Dashboard.vue"
import InventoryView from "../views/DaftarBarang.vue"
import SalesGraphView from "../views/GrafikPenjualan.vue"
import HistoryView from "../views/RiwayatStok.vue"
import ManageUserView from "../views/ManajemenPengguna.vue"
import ProfileView from "../views/Profile.vue"


const routes = [
    { path:'', component: DashboardView },
    { path:'/daftarbarang', component: InventoryView },
    { path:'/grafikpenjualan', component: SalesGraphView },
    { path:'/riwayatstok', component: HistoryView },
    { path:'/manajemenpengguna', component: ManageUserView },
    { path:'/profile', component: ProfileView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
