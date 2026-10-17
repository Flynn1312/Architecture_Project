
<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')

function login() {
  error.value = ''
  success.value = ''

  if (!email.value || !password.value) {
    error.value = 'Please enter your email and password.'
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    error.value = 'Please enter a valid email address.'
    return
  }

  // Demo only: no real authentication yet
  success.value = 'Form validated successfully!'
}
</script>

<template>
  <main class="login-page">
    <form class="login-form" @submit.prevent="login">
      <h1>Welcome back</h1>
      <p>Sign in to your account</p>

      <label for="email">Email address</label>
      <input
        id="email"
        v-model.trim="email"
        type="email"
        placeholder="you@example.com"
        autocomplete="email"
        required
      />

      <label for="password">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Enter your password"
        autocomplete="current-password"
        required
      />

      <p v-if="error" class="error" role="alert">
        {{ error }}
      </p>

      <p v-if="success" class="success" role="status">
        {{ success }}
      </p>

      <button type="submit">Sign in</button>
    </form>
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f3f4f6;
}

.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 32px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px #00000010;
}

h1 {
  margin-bottom: 8px;
}

.login-form > p:first-of-type {
  color: #666;
  margin-bottom: 28px;
}

label {
  display: block;
  margin: 16px 0 8px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

input:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

button {
  width: 100%;
  margin-top: 24px;
  padding: 13px;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background: #1d4ed8;
}

.error {
  color: #b91c1c;
}

.success {
  color: #15803d;
}
</style>
