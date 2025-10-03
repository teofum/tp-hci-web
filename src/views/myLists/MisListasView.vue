<script setup lang="ts">
import listEntry from '@/components/listEntry.vue'
import addListButton from '@/components/button.vue'
</script>

<template>
  <div class="body">
    <div class="main_container">
        <h1>Mis listas</h1>
        <div class="listas">
            <!--todo esto seguro esta mal-->
            <li>
                <listEntry />
            </li>
        </div>
        <addListButton />
    </div>
  </div>
</template>

<style>


.body {
  color: black;

  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ece7df;
}

/*
button {
  width: 358px;
  height: 40px;
  padding: 0 16px;
  background-color: #223030;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}
*/

p {
  font-size: 0.875rem;
  color: #000000a6;
  margin: 0;
  text-align: center;
}

a {
  color: #000000a6;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
