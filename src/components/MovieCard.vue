<script setup lang="ts">
interface Filme {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string
  vote_average: number
}

defineProps<{
  filme: Filme
}>()

function pegarPoster(caminho: string | null) {
  if (caminho) {
    return `https://image.tmdb.org/t/p/w500${caminho}`
  }

  return 'https://via.placeholder.com/500x750?text=Sem+Imagem'
}

function pegarAno(data: string) {
  if (data) {
    return data.substring(0, 4)
  }

  return 'Sem ano'
}

function cortarSinopse(texto: string) {
  if (!texto) {
    return 'Este filme ainda não possui sinopse disponível.'
  }

  if (texto.length > 110) {
    return texto.substring(0, 110) + '...'
  }

  return texto
}
</script>

<template>
  <div class="card movie-card h-100 text-white border-0 shadow">
    <div class="poster-area">
      <img
        :src="pegarPoster(filme.poster_path)"
        class="card-img-top poster-img"
        :alt="filme.title"
      />

      <span class="badge bg-warning text-dark nota-badge">
        ⭐ {{ filme.vote_average.toFixed(1) }}
      </span>
    </div>

    <div class="card-body d-flex flex-column">
      <div class="mb-2">
        <h5 class="card-title fw-bold mb-1">
          {{ filme.title }}
        </h5>

        <span class="badge bg-secondary">
          {{ pegarAno(filme.release_date) }}
        </span>
      </div>

      <p class="card-text text-light small flex-grow-1">
        {{ cortarSinopse(filme.overview) }}
      </p>

      <RouterLink :to="`/filmes/${filme.id}`" class="btn btn-danger w-100 m5-2">
        Ver detalhes
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  background: #1c1c24;
  border-radius: 16px;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.movie-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45) !important;
}

.poster-area {
  position: relative;
  background: #111;
}

.poster-img {
  height: 380px;
  object-fit: cover;
}

.nota-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 0.85rem;
}
</style>
