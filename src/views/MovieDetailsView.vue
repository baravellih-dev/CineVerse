<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>

<template>
  <main class="min-vh-100 bg-dark text-white">
    <section class="container py-5">
      <h1 class="fw-bold mb-3">Detalhes do filme</h1>

      <p class="text-secondary">ID do filme recebido pela rota: {{ id }}</p>

      <RouterLink to="/filmes" class="btn btn-outline-light"> Voltar para filmes </RouterLink>
    </section>
  </main>
</template>
