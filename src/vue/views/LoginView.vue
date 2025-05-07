<script setup>
  import { ref } from 'vue'

  const loginAttempts = ref(0)
  const name = ref('')
  const email = ref('')

  function onFormSubmit() {
    console.log('onFormSubmit')
    loginAttempts.value++
  }
  function nameChanged() {
    console.log('nameChanged')
  }
  function emailChanged() {
    console.log('emailChanged')
  }

  function subirContador() {
    loginAttempts.value++
    console.log(`datos del formulario: name: ${name.value}, email: ${email.value}, intentos: ${loginAttempts.value}`)
  }
</script>

<template>
  <form id="signInForm" @submit.prevent="onFormSubmit">
    <slot></slot>
    <p>nombre: {{ name }}</p>
    <p>email: {{ email }}</p>
    <p>intentos: {{ loginAttempts }}</p>
    <input
      type="text"
      id="name"
      v-model="name"
      placeholder="Nombre de usuario"
      @input="nameChanged"
      required>
    <input
      type="email"
      id="email"
      v-model="email"
      placeholder="Email"
      @input="emailChanged"
      required>
    <button type="submit">Sign In</button>
    <button type="button" @click="subirContador">Subir contador</button>
  </form>
</template>

<style scoped>
  form {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: rgba(118, 84, 243, 0.47);

    input {
      height: 40px;
    }

    button {
      height: 40px;
      background-color: chartreuse;
    }
  }
</style>
