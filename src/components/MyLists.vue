<script setup lang="ts">
import listEntry from '../components/listEntry.vue'
</script>

<template>
  <div >
    <div class="main_container">
        <h1>Mis listas</h1>
        <div class="listas">
            <!--todo esto seguro esta mal-->
            <li>
                <listEntry />
            </li>
        </div>
        <!--nueva lista button-->
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .myLists {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
