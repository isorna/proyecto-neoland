<script setup>
const props = defineProps({
  info: String
})

console.log('propiedad info', props.info)
</script>

<template>
  <h1>{{ info }}</h1>
</template>
