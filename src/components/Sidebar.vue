<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <aside>
        <div class="logo">
            <img src="../assets/bvent logo transparant.png" alt="Bvent">
        </div>

        <div class="menu">
            <RouterLink class="button" to="/">
                <span class="material-icons">widgets</span>
                <span class="text">Dashboard</span>
            </RouterLink>

            <RouterLink class="button" to="/daftarbarang">
                <span class="material-icons">shelves</span>
                <span class="text">Daftar Barang</span>
            </RouterLink>

            <RouterLink class="button" to="/transaksi">
                <span class="material-icons">add_shopping_cart</span>
                <span class="text">Transaksi</span>
            </RouterLink>

            <RouterLink class="button" to="/riwayattransaksi">
                <span class="material-icons">receipt_long</span>
                <span class="text">Riwayat Transaksi</span>
            </RouterLink>

            <RouterLink class="button" to="/manajemenpengguna">
                <span class="material-icons">groups</span>
                <span class="text">Manajemen Pengguna</span>
            </RouterLink>

            <RouterLink class="button" to="/profile">
                <span class="material-icons">person</span>
                <span class="text">Profile</span>
            </RouterLink>
        </div>
    </aside>
</template>


<style scoped>
aside {
    display: flex;
    flex-direction: column;
    width: 265px;
    min-height: 100vh;
    overflow: hidden;
    padding: 16px;
    background: linear-gradient(to bottom, #ffffff, #f8fafc);
    border-right: 1px solid #e0e6ed;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.02);
}

.logo {
    margin-bottom: 16px;
    margin-left: 5px;
}

img {
    width: 224px;
    margin-top: -10px;
}

@media (max-width: 768px) {
    aside {
        position: fixed;
        z-index: 99;
    }

}

.menu {
    margin: 0 -16px;
    margin-top: 20px;
}

.button {
    display: flex;
    align-items: center;
    text-decoration: none;

    padding: 8px 16px;
}

.material-icons {
    font-size: 32px;
    color: #3d95fb;
    margin-right: 10px;
    padding: 5px;
}

.text {
    color: #969496;
    font-size: 14px;
}

.material-icons:hover {
    color: #1e4a7d;
}

.text:hover {
    color: #6d6d6d;
}

</style>