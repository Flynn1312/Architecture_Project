

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/login">Login</router-link>
  </nav>

  <router-view />
</template>


<style>
nav {
  display: flex;
  gap: 20px;
  padding: 20px;
}
</style>
