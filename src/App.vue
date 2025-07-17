<template>
  <div class="container">
    <h2>Учетные записи</h2>
    <AccountForm />
  </div>
</template>

<script setup lang="ts">
import AccountForm from './components/AccountForm.vue'
</script>

<style>
.container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
}
</style>
