<script setup lang="ts">
interface Genero {
  id: number
  name: string
}

defineProps<{
  generos: Genero[]
  generoSelecionado: string
}>()

const emit = defineEmits<{
  selecionar: [id: string]
}>()
</script>

<template>
  <div class="mb-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-5">
        <select
          class="select-cine w-100"
          :value="generoSelecionado"
          @change="emit('selecionar', ($event.target as HTMLSelectElement).value)"
        >
          <option value="">Todos os gêneros</option>

          <option v-for="genero in generos" :key="genero.id" :value="genero.id">
            {{ genero.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-cine {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  padding: 14px 16px;
  backdrop-filter: blur(6px);
}

.select-cine:focus {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  border-color: #dc3545;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}

.select-cine option {
  background-color: #1c1c24;
  color: #fff;
}
</style>
