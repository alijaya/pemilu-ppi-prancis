<template>
  <el-container class="app">
    <el-header>
      <el-menu 
        :default-active="this.$route.path"
        mode="horizontal"
        router
        class="nav">
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item v-if="this.$store.currentUser" index="/user">User</el-menu-item>
        <el-menu-item v-if="!this.$store.currentUser" index="/login">Login</el-menu-item>
        <el-menu-item index="/admin">Admin</el-menu-item>
      </el-menu>
    </el-header>
    <router-view/>
  </el-container>
</template>

<script>
export default {
  name: 'app'
}
</script>

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

</style>
