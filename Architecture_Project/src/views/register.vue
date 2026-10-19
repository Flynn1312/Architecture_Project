
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

async function register() {
  error.value = ''
  success.value = ''

  if (
    !username.value.trim() ||
    !email.value.trim() ||
    !password.value
  ) {
    // make sure inputs are filled
    error.value = 'Please fill in all fields.'
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    // make sure email is valid
    error.value = 'Please enter a valid email address.'
    return
  }

  if (password.value.length < 8) {
    // make sure password is at least 8 characters
    error.value = 'Password must be at least 8 characters.'
    return
  }

  loading.value = true

  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      error.value = data.message || 'Registration failed.'
      return
    }

    success.value = 'Account created successfully!'
    // redirect to login page after a short delay (maybe redirect to correct dashboard based on role in the future)
    await router.push('/login')
  } catch (err) {
    error.value = 'Cannot connect to the server. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="register-page">
    <form class="register-form" @submit.prevent="register">
      <h1>Create an account</h1>
      <p>Register for your account</p>

      <label for="username">Username</label>
      <input
        id="username"
        v-model.trim="username"
        type="text"
        placeholder="Choose a username"
        autocomplete="username"
        required
      />

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
        placeholder="At least 8 characters"
        autocomplete="new-password"
        minlength="8"
        required
      />

      <p v-if="error" class="error" role="alert">
        {{ error }}
      </p>

      <p v-if="success" class="success" role="status">
        {{ success }}
      </p>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Creating account...' : 'Register' }}
      </button>

      <p class="login-link">
        Already have an account?
        <RouterLink to="/">Sign in</RouterLink>
      </p>
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
}

.register-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-image: url('../images/schoolbg.png');
  background-size: cover;
  background-position: center 80%;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.register-form {
  width: 100%;
  max-width: 400px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.register-form h1 {
  margin: 0 0 8px;
  font-size: 28px;
}

.register-form > p:first-of-type {
  color: #000000;
  margin: 0 0 28px;
}

.register-form label {
  display: block;
  margin: 16px 0 8px;
  font-weight: 600;
}

.register-form input {
  display: block;
  width: 100%;
  padding: 12px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  font-size: 16px;
  background: #ffffff;
}

.register-form input:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

.register-form button {
  width: 100%;
  margin-top: 12px;
  padding: 13px;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
}

.register-form button:hover {
  background: #1d4ed8;
}

.register-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.register-form .error {
  color: #b91c1c;
}

.register-form .success {
  color: #15803d;
}

.register-form .login-link {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #000000;
}

.register-form .login-link a {
  color: #2563eb;
  text-decoration: none;
}

.register-form .login-link a:hover {
  text-decoration: underline;
}
</style>
