<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

interface Genero {
  id: number
  name: string
}

interface FilmeDetalhes {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  runtime: number
  genres: Genero[]
  vote_average: number
  original_language: string
  status: string
}

const route = useRoute()
const router = useRouter()

const filme = ref<FilmeDetalhes | null>(null)
const carregando = ref(false)
const erro = ref('')

const token = import.meta.env.VITE_TMDB_TOKEN

function pegarPoster(caminho: string | null) {
  if (caminho) {
    return `https://image.tmdb.org/t/p/w500${caminho}`
  }

  return 'https://via.placeholder.com/500x750?text=Sem+Imagem'
}

function pegarFundo(caminho: string | null) {
  if (caminho) {
    return `https://image.tmdb.org/t/p/original${caminho}`
  }

  return ''
}

function formatarData(data: string) {
  if (!data) {
    return 'Data não informada'
  }

  return new Date(data).toLocaleDateString('pt-BR')
}

function formatarDuracao(minutos: number) {
  if (!minutos) {
    return 'Duração não informada'
  }

  const horas = Math.floor(minutos / 60)
  const min = minutos % 60

  return `${horas}h ${min}min`
}

function voltar() {
  router.back()
}

async function carregarDetalhes() {
  carregando.value = true
  erro.value = ''

  try {
    const resposta = await axios.get(`https://api.themoviedb.org/3/movie/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        language: 'pt-BR',
      },
    })

    filme.value = resposta.data
  } catch (error) {
    erro.value = 'Não foi possível carregar os detalhes do filme.'
    console.log(error)
  } finally {
    carregando.value = false
  }
}

onMounted(() => {
  carregarDetalhes()
})
</script>

<template>
  <main class="min-vh-100 text-white pagina-detalhes">
    <div v-if="carregando" class="container py-5 text-center">
      <div class="spinner-border text-danger" role="status"></div>
      <p class="mt-3">Carregando detalhes...</p>
    </div>

    <div v-else-if="erro" class="container py-5">
      <div class="alert alert-danger text-center">
        {{ erro }}
      </div>

      <button class="btn btn-outline-light" @click="voltar">Voltar</button>
    </div>

    <section
      v-else-if="filme"
      class="detalhes-hero"
      :style="{
        backgroundImage: filme.backdrop_path
          ? `linear-gradient(rgba(0, 0, 0, 0.72), rgba(8, 8, 12, 0.96)), url(${pegarFundo(filme.backdrop_path)})`
          : '',
      }"
    >
      <div class="container py-5">
        <button class="btn btn-outline-light mb-4" @click="voltar">← Voltar</button>

        <div class="row g-4 align-items-center">
          <div class="col-12 col-md-4">
            <img
              :src="pegarPoster(filme.poster_path)"
              :alt="filme.title"
              class="poster-detalhes shadow"
            />
          </div>

          <div class="col-12 col-md-8">
            <h1 class="display-5 fw-bold mb-2">
              {{ filme.title }}
            </h1>

            <p class="text-secondary mb-3">Título original: {{ filme.original_title }}</p>

            <div class="d-flex flex-wrap gap-2 mb-4">
              <span class="badge bg-warning text-dark">
                ⭐ {{ filme.vote_average.toFixed(1) }}
              </span>

              <span class="badge bg-secondary">
                {{ formatarData(filme.release_date) }}
              </span>

              <span class="badge bg-danger">
                {{ formatarDuracao(filme.runtime) }}
              </span>

              <span class="badge bg-info text-dark">
                {{ filme.original_language.toUpperCase() }}
              </span>

              <span class="badge bg-light text-dark">
                {{ filme.status }}
              </span>
            </div>

            <div class="mb-4">
              <span
                v-for="genero in filme.genres"
                :key="genero.id"
                class="badge rounded-pill bg-outline-genero me-2 mb-2"
              >
                {{ genero.name }}
              </span>
            </div>

            <h2 class="h4 fw-bold">Sinopse</h2>

            <p class="sinopse">
              {{
                filme.overview ? filme.overview : 'Este filme ainda não possui sinopse disponível.'
              }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.pagina-detalhes {
  background:
    radial-gradient(circle at top, rgba(220, 53, 69, 0.22), transparent 35%),
    linear-gradient(135deg, #08080c, #14141f, #08080c);
}

.detalhes-hero {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
}

.poster-detalhes {
  width: 100%;
  max-width: 380px;
  border-radius: 18px;
  object-fit: cover;
}

.sinopse {
  font-size: 1.08rem;
  line-height: 1.8;
  color: #e5e5e5;
}

.bg-outline-genero {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
