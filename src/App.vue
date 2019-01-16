<template>
  <el-container id="app">
    <el-header id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/user">User</router-link> |
      <router-link to="/admin">Admin</router-link> |
    </el-header>
    <router-view/>
  </el-container>
</template>

<style>
body {
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<style scoped>
#app {
}
</style>
