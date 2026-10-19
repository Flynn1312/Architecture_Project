<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

async function login() {
  error.value = ''
  success.value = ''

  if (!email.value || !password.value) {
    // make sure inputs are filled
    error.value = 'Please enter your email and password.'
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    // make sure email is valid
    error.value = 'Please enter a valid email address.'
    return
  }

  loading.value = true

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      error.value = data.message || 'Login failed.'
      return
    }
    // login successful, redirect based on user role
    if (data.user.role == 'student') {
    await router.push('/student')
    return
    }
    else if (data.user.role == 'lecturer') {
    await router.push('/lecturer')
    return
    }
    else if (data.user.role == 'ml') {
    await router.push('/ml')
    return
    }
    else if (data.user.role == 'cl') {
    await router.push('/cl')
    return
    }
    else if (data.user.role == 'aa') {
    await router.push('/aa')
    return
    }
    else if (data.user.role == 'admin') {
    await router.push('/admin')
    return
    }

  } catch (err) {
    error.value = 'Cannot connect to the server. Please try again.'
  } finally {
    loading.value = false
  }
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

      <button type="submit" :disabled="loading">
        {{ loading ? 'Signing in...' : 'Sign in' }}
      </button>
      <p class="register-link">
        Don't have an account?
        <RouterLink to="/register">Sign up</RouterLink>
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

.login-page {
  min-height: 100vh;
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

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

h1 {
  margin: 0 0 8px;
  font-size: 28px;
}

.login-form > p:first-of-type {
  color: #060606;
  margin-bottom: 28px;
}

label {
  display: block;
  margin: 16px 0 8px;
  font-weight: 600;
}

input {
  display: block;
  width: 100%;
  padding: 12px;
  margin-bottom: 26px;
  margin-top: 8px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  font-size: 16px;
  background: #ffffff;
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

.login-form .register-link {
  margin-top: 20px;
  padding-top: 30px;
  text-align: center;
  font-size: 14px;
  color: #090909;
}

.login-form .register-link a {
  color: #2563eb;
  text-decoration: none;
}

.login-form .register-link a:hover {
  text-decoration: underline;
}
</style>
