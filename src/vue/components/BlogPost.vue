<script setup>
  // Propiedades
defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article>
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
  </article>
</template>

<style scoped>
  article {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;

    h2 {
      margin: 0;
    }

    p {
      margin: 0;
    }
  }
</style>
