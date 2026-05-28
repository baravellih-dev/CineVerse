<script setup lang="ts">
import { ref } from 'vue'

const buscaLocal = ref('')
const emit = defineEmits<{
    buscar: [texto: string]
    limpar: []
}>()

function buscarFilme() {
    emit('buscar', buscaLocal.value)
}

function limparBusca() {
    buscaLocal.value = ''
    emit('limpar')
}
</script>

<template>
    <form class="search-bar-cine mb-5" @submit.prevent="buscarFilme">
        <div class="row g-2 justify-content-center">
            <div class="col-12 col-md-7">
                <input
                    v-model="buscaLocal"
                    type="text"
                    class="form-control form-control-lg input-cine"
                    placeholder="Digite o nome de um filme..."
                />
            </div>

            <div class="col-6 col-md-auto">
                <button type="submit" class="btn btn-danger btn-lg w-100">
                    Buscar
                </button>
            </div>

            <div class="col-6 col-md-auto">
                <button
                    type="button"
                    class="btn btn-outline-light btn-lg w-100"
                    @click="limparBusca"
                >
                    Limpar
                </button>
            </div>
        </div>
    </form>
</template>

<style scoped>
.search-bar-cine {
  position: relative;
  z-index: 3;
}

.input-cine {
  background-color: rgba(255, 255, 255, 0.08);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.input-cine::placeholder {
  color: rgba(255, 255, 255, 0.55);
}

.input-cine:focus {
  background-color: rgba(255, 255, 255, 0.12);
  color: white;
  border-color: #dc3545;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}
</style>