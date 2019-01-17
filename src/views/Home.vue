<template>
  <el-main class="home">
    <CanVote />
    <h1>Pemilu PPI Prancis 2018 - 2019</h1>
    <template v-if="!$store.isLoggedIn">
      <p>Please log in!</p>
      <router-link to="/login"><el-button type="primary">Go to Login Page</el-button></router-link>
    </template>
    <template v-else>
      <p>Please vote!</p>
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
</style>
