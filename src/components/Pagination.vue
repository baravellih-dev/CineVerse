<script setup lang="ts">
defineProps<{
  paginaAtual: number
  totalPaginas: number
}>()

const emit = defineEmits<{
  anterior: []
  proxima: []
}>()
</script>
<template>
  <div class="paginacao-cine d-flex justify-content-center align-items-center gap-3 mt-5">
    <button
      class="btn btn-outline-light px-4"
      :disabled="paginaAtual === 1"
      @click="emit('anterior')"
    >
      Anterior
    </button>

    <span class="info-pagina"> Página {{ paginaAtual }} de {{ totalPaginas }} </span>

    <button
      class="btn btn-danger px-4"
      :disabled="paginaAtual === totalPaginas"
      @click="emit('proxima')"
    >
      Próxima
    </button>
  </div>
</template>
<style scoped>
.paginacao-cine {
  color: #fff;
}

.info-pagina {
  background: rgba(255, 255, 255, 0.08);
  padding: 8px 18px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
}

button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
