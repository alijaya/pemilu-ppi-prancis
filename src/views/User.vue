<template>
  <el-main class="user">
    <template v-if="$store.currentUser">
      <h1>Hello {{$store.userData.name || $store.currentUser.email}}</h1>
      <el-alert
        v-if="$store.isRegistered"
        title="You have been registered"
        type="success"
        show-icon
        :closable="false" />
      <el-alert
        v-else
        title="You haven't been registered"
        type="error"
        show-icon
        :closable="false" />
      <el-button @click="logout">Log Out</el-button>
      <template v-if="$store.isRegistered && $store.isUserLoaded">
        <h2>Vote!</h2>
        <el-radio-group v-model="vote" @change="onChange">
          <el-radio :label="1">1. Ridho dan Avira</el-radio>
          <el-radio :label="2">2. Hazem dan Yulia</el-radio>
          <el-radio :label="0">Abstain</el-radio>
        </el-radio-group>
      </template>
    </template>
  </el-main>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'user',
  data() {
    return {
      vote: 0
    }
  },
  mounted() {
    console.log(this.$store.userData.vote)
    if (this.$store.isUserLoaded) {
      this.vote = this.$store.userData.vote
    } else {
      this.$store.$once('userLoaded', () => {
        this.vote = this.$store.userData.vote
      })
    }
  },
  methods: {
    onChange(value) {
      console.log(value)
      this.$store.userRef.set({
        vote: this.vote
      }, { merge: true })
    },
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

<style scoped>
</style>
