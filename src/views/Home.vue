<template>
  <el-main class="home center">
    <CanVote />
    <article class="article">
      <h1>Pemilu PPI Prancis 2018 - 2019</h1>
      <p>
        <router-link to="/ridho"><el-button>Info tentang 1. Ridho dan Avira</el-button></router-link>
      </p>
      <p>
        <router-link to="/hazem"><el-button>Info tentang 2. Hazem dan Yulia</el-button></router-link>
      </p>
      <p>
        <img src="@/assets/calon.jpg" class="full-width" />
      </p>
      <h1>Debat Pemilu PPI Prancis 2018 - 2019 (20 Januari 2019, Jam 8 Malam)</h1>
      <div class="video-wrapper">
        <iframe src="https://www.youtube.com/embed/mFv59fJbiL0" frameborder="0"  allowfullscreen></iframe>
      </div>

      <template v-if="!$store.isLoggedIn">
        <h2>Please log in!</h2>
        <router-link to="/login"><el-button type="primary">Go to Login Page</el-button></router-link>
      </template>
      <template v-else>
        <h2>Please vote!</h2>
        <router-link to="/user"><el-button type="primary">Go to User Page</el-button></router-link>
      </template>
    </article>
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
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
}
.video-wrapper > iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.full-width {
  width: 100%;
}
.article {
  max-width: 100%;
  width: 40em;
  line-height: 2em;
}
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
