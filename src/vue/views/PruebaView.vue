<script setup>
import EjemploPropiedades from '../components/EjemploPropiedades.vue'
import BlogPost from '../components/BlogPost.vue'
import { ref, computed } from 'vue'
// Estados
const title = ref('')
const body = ref('')
const posts = ref([
  {
    id: 1,
    title: 'D',
    body: 'Cuerpo del post 1'
  },
  {
    id: 2,
    title: 'B',
    body: 'Cuerpo del post 2'
  }
])

const postsSortedByTitle = computed(() => [...posts.value].sort((a, b) => {
  const titleA = a.title.toLowerCase()
  const titleB = b.title.toLowerCase()
  if (titleA < titleB) return -1
  if (titleA > titleB) return 1
  return 0
}))

function newPost() {
  const nuevoIndice = posts.value.length + 1
  // Leemos los datos del formulario e introducimos un nuevo valor en la lista
  posts.value.push({
    id: nuevoIndice,
    title: title.value,
    body: body.value
  })
}
</script>

<template>
  <main>
    <h1>Página de prueba: propiedades</h1>
    <EjemploPropiedades info="Información"></EjemploPropiedades>
  </main>
  <section>
    <h2>Blog</h2>
    <form @submit.prevent="newPost">
      <h2>Nuevo artículo</h2>
      <input type="text" placeholder="Título" id="title" v-model="title" required />
      <input type="text" placeholder="Cuerpo" id="body" v-model="body" required />
      <button type="submit">Nuevo post</button>
    </form>
    <BlogPost v-for="post in postsSortedByTitle" :key="post.id" :post="post"></BlogPost>
  </section>
</template>

<style scoped>
main {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    padding: 10px;
  }

  button {
    padding: 10px;
  }
}
</style>
