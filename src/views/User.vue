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
      <template v-if="$store.isRegistered && $store.isUserLoaded">
        <h2>Vote!</h2>
        <el-radio-group v-model="vote" @change="onChange">
          <el-radio v-for="(item, index) in voteChoices" :key="index" :label="index">{{item}}</el-radio>
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
      vote: 0,
      voteChoices: [
        'Abstain',
        '1. Ridho dan Avira',
        '2. Hazem dan Yulia'
      ]
    }
  },
  mounted() {
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
      this.$store.userRef.set({
        vote: value
      }, { merge: true })
      .then(() => {
        this.$success(`Saved: "${this.voteChoices[value]}"`)
      })
    },
  }
}
</script>

<style scoped>
</style>
