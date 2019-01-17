<template>
  <el-main class="home">
    <CanVote />
    <h1>Pemilu PPI Prancis 2018 - 2019</h1>
    <p>
      <router-link to="/ridho"><el-button>Info tentang 1. Ridho dan Avira</el-button></router-link>
    </p>
    <p>
      <router-link to="/hazem"><el-button>Info tentang 2. Hazem dan Yulia</el-button></router-link>
    </p>
    <p><img src="@/assets/calon.jpg" class="full-width" /></p>
    <template v-if="!$store.isLoggedIn">
      <h2>Please log in!</h2>
      <router-link to="/login"><el-button type="primary">Go to Login Page</el-button></router-link>
    </template>
    <template v-else>
      <h2>Please vote!</h2>
      <router-link to="/user"><el-button type="primary">Go to User Page</el-button></router-link>
    </template>
  </el-main>
</template>

<script>
// @ is an alias to /src
import CanVote from '@/components/CanVote'

export default {
  name: 'home',
  components: {
    CanVote
  }
}
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>
