<template>
  <el-main class="user">
    <template v-if="$store.currentUser">
      <h1>Hello {{$store.currentUser.email}}</h1>
      <el-button @click="logout">Log Out</el-button>
    </template>
  </el-main>
</template>

<script>
// @ is an alias to /src
import firebase from '@/scripts/firebaseConfigured'

const auth = firebase.auth()

export default {
  name: 'user',
  methods: {
    logout() {
      const email = this.$store.currentUser.email
      this.$auth.signOut()
      .then(response => {
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

<style scoped>
</style>
