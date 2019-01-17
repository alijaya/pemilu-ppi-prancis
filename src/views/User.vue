<template>
  <el-main class="user">
    <CanVote />
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
      <h2>Vote!</h2>
      <el-radio-group 
        v-model="vote" 
        :disabled="!($store.statusToVote == 'valid' && $store.isRegistered && $store.isUserLoaded)"
        @change="onChange">
        <el-radio 
          v-for="(item, index) in voteChoices" 
          :key="index" 
          :label="index" 
          border
          class="radio">{{item}}</el-radio>
      </el-radio-group>
    </template>
  </el-main>
</template>

<script>
// @ is an alias to /src
import CanVote from '@/components/CanVote'

export default {
  name: 'user',
  components: {
    CanVote
  },
  data() {
    return {
      vote: 0,
      voteChoices: [
        'Abstain',
        '1. Ridho dan Avira',
        '2. Hazem dan Yulia'
      ],
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
      this.$store.userRef.update({
        vote: value
      })
      .then(() => {
        this.$success(`Saved: "${this.voteChoices[value]}"`)
      })
    },
  }
}
</script>

<style scoped>
.radio {
  display: block;
}
.radio + .radio {
  margin-left: 0 !important;
  margin-top: 1em;
}
</style>
