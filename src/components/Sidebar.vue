<template>
    <aside>
        <div class="logo">
            <img src="../assets/bvent logo transparant.png" alt="Bvent">
        </div>

        <h3>
            VERDIAN RAMADHAN<br />
            LEADER
        </h3>

        <div class="menu">
            <RouterLink class="button" to="/">
                <span class="material-icons">widgets</span>
                <span class="text">Dashboard</span>
            </RouterLink>

            <RouterLink class="button" to="/daftarbarang">
                <span class="material-icons">shelves</span>
                <span class="text">Daftar Barang</span>
            </RouterLink>

            <RouterLink class="button" to="/grafikpenjualan">
                <span class="material-icons">query_stats</span>
                <span class="text">Grafik Penjualan</span>
            </RouterLink>

            <RouterLink class="button" to="/riwayatstok">
                <span class="material-icons">receipt_long</span>
                <span class="text">Riwayat Stok</span>
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

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
aside {
    display: flex;
    flex-direction: column;
    width: 265px;
    min-height: 100vh;
    overflow: hidden;
    padding: 16px;

    background-color: #ffffff;
    color: #969696;
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

h3 {
    text-align: center;
    margin-top: 5px;
    margin-bottom: 40px;
    line-height: 1.5;
    font-size: 18px;
}

</style>