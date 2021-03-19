<template>
  <el-container class="app">
    <el-header height="auto">
      <el-menu 
        :default-active="this.$route.path"
        mode="horizontal"
        router
        class="nav">
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/result">Result</el-menu-item>
        <el-submenu index="/candidates">
          <template slot="title">Candidates</template>
          <el-menu-item index="/ridho">1. Ridho dan Avira</el-menu-item>
          <el-menu-item index="/hazem">2. Hazem dan Yulia</el-menu-item>
        </el-submenu>
        <el-menu-item v-if="this.$store.isLoggedIn" index="/user">User</el-menu-item>
        <el-menu-item v-if="this.$store.isModerator" index="/moderator">Moderator</el-menu-item>
        <el-menu-item v-if="this.$store.isAdmin" index="/admin">Admin</el-menu-item>
        <el-menu-item v-if="!this.$store.isLoggedIn" index="/login">Login</el-menu-item>
        <el-menu-item v-if="this.$store.isLoggedIn" index="" @click="logout">Logout</el-menu-item>
      </el-menu>
    </el-header>
    <router-view/>
  </el-container>
</template>

<script>
export default {
  name: 'app',
  methods: {
    logout() {
      const email = this.$store.currentUser.email
      this.$auth.signOut()
      .then(() => {
        this.$success(`${email} has signed out`)
        this.$router.push({ name: 'login' })
      })
      .catch(error => {
        this.$error(error)
      })
    }
  }
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
