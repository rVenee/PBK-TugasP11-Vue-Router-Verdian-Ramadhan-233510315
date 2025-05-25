<script setup>
import { RouterView } from 'vue-router';
import Sidebar from './components/Sidebar.vue';

</script>

<template>
  <div class="app">
    <Sidebar />
    <RouterView />
  </div>
</template>

<style>

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Fira Sans", sans-serif;
  }

  body {
    background-image: url('./assets/layered-waves-haikeiz.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  button {
    cursor: pointer;
    appearance: none;
    border: none;
    outline: none;
    background: none;
  }

  .app {
    display: flex;

  }

  main {
    flex: 1 1 0;
    padding: 32px;
    padding-left: 64px;
    color: #ffffff;
  }

</style>
