<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import MovieCard from '@/components/MovieCard.vue'
import Pagination from '@/components/Pagination.vue'
import SearchBar from '@/components/SearchBar.vue'
import GenreFilter from '@/components/GenreFilter.vue'

interface Filme {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string
  vote_average: number
}

interface Genero {
  id: number
  name: string
}

const filmes = ref<Filme[]>([])
const carregando = ref(false)
const erro = ref('')
const paginaAtual = ref(1)
const totalPaginas = ref(1)
const busca = ref('')

const generos = ref<Genero[]>([])
const generoSelecionado = ref('')

const token = import.meta.env.VITE_TMDB_TOKEN

async function carregarFilmes() {
  carregando.value = true
  erro.value = ''

  try {
    let url = 'https://api.themoviedb.org/3/discover/movie'

    const parametros: {
      language: string
      page: number
      sort_by?: string
      with_genres?: string
      query?: string
      include_adult?: boolean
    } = {
      language: 'pt-BR',
      page: paginaAtual.value,
    }

    if (busca.value.trim() !== '') {
      url = 'https://api.themoviedb.org/3/search/movie'
      parametros.query = busca.value
      parametros.include_adult = false
    } else {
      parametros.sort_by = 'popularity.desc'

      if (generoSelecionado.value !== '') {
        parametros.with_genres = generoSelecionado.value
      }
    }

    const resposta = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: parametros,
    })

    filmes.value = resposta.data.results
    totalPaginas.value = resposta.data.total_pages
  } catch (error) {
    erro.value = 'Não foi possível carregar os filmes. Verifique o token da TMDB.'
  } finally {
    carregando.value = false
  }
}

function proximaPagina() {
  if (paginaAtual.value < totalPaginas.value) {
    paginaAtual.value++
    carregarFilmes()

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}

function paginaAnterior() {
  if (paginaAtual.value > 1) {
    paginaAtual.value--
    carregarFilmes()

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}

function buscarFilmes(texto: string) {
  busca.value = texto
  paginaAtual.value = 1
  carregarFilmes()
}

function limparBusca() {
  busca.value = ''
  paginaAtual.value = 1
  carregarFilmes()
}

async function carregarGeneros() {
  try {
    const resposta = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        language: 'pt-BR',
      },
    })

    generos.value = resposta.data.genres
  } catch (error) {
    console.log(error)
  }
}

function alterarGenero(id: string) {
  generoSelecionado.value = id
  busca.value = ''
  paginaAtual.value = 1
  carregarFilmes()
}

onMounted(() => {
  carregarGeneros()
  carregarFilmes()
})
</script>

<template>
  <main class="min-vh-100 text-white pagina-filmes">
    <section class="hero-cineverse text-center">
      <div class="container py-5 position-relative">
        <h1 class="display-4 fw-bold mb-3">CineVerse</h1>

        <p class="lead text-light mb-0">Explore filmes populares e veja detalhes completos.</p>
      </div>
    </section>

    <section class="container py-5 position-relative">
      <SearchBar @buscar="buscarFilmes" @limpar="limparBusca" />
      <GenreFilter
        :generos="generos"
        :genero-selecionado="generoSelecionado"
        @selecionar="alterarGenero"
      />

      <h2 v-if="busca" class="h4 fw-bold mb-4">Resultados para "{{ busca }}"</h2>
      <div v-if="carregando" class="text-center my-5">
        <div class="spinner-border text-danger" role="status"></div>
        <p class="mt-3">Carregando filmes...</p>
      </div>

      <div v-else-if="erro" class="alert alert-danger text-center">
        {{ erro }}
      </div>
      <div v-else-if="filmes.length === 0" class="alert alert-secondary text-center">
        Nenhum filme encontrado. Tente buscar outro título.
      </div>
      <div v-else>
        <div class="row g-4">
          <div v-for="filme in filmes" :key="filme.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
            <MovieCard :filme="filme" />
          </div>
        </div>

        <Pagination
          :pagina-atual="paginaAtual"
          :total-paginas="totalPaginas"
          @anterior="paginaAnterior"
          @proxima="proximaPagina"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.pagina-filmes {
  position: relative;
  background:
    radial-gradient(circle at top, rgba(220, 53, 69, 0.25), transparent 35%),
    linear-gradient(135deg, #08080c, #14141f, #08080c);
}

.hero-cineverse {
  position: relative;
  z-index: 1;
  background:
    linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.85)),
    linear-gradient(135deg, #3a0d12, #090912);
  border-bottom: none;
  overflow: visible;
}

.hero-cineverse .container {
  position: relative;
  z-index: 2;
}

.hero-cineverse::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -120px;

  height: 160px;
  background: linear-gradient(
    to bottom,
    rgba(3, 3, 5, 1) 0%,
    rgba(8, 5, 9, 0.95) 25%,
    rgba(25, 8, 17, 0.85) 55%,
    rgba(39, 12, 24, 0.45) 78%,
    rgba(20, 20, 31, 0) 100%
  );

  pointer-events: none;
  z-index: 1;
}

section.container {
  position: relative;
  z-index: 2;
}
</style>
