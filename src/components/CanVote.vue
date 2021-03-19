<template>
  <el-alert
    :title="statusToVoteTitles[$store.statusToVote]"
    :description="statusToVoteDescriptions[$store.statusToVote]"
    :type="$store.statusToVote == 'valid' ? 'success' : 'error'"
    :closable="false"/>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'can-vote',
  data() {
    return {
      statusToVoteTitles: {
        'valid': 'You can vote now',
        'locked': 'The vote has been locked',
        'before': 'The vote has not been opened',
        'after': 'The vote has already been closed',
      },
    }
  },
  computed: {
    statusToVoteDescriptions() {
      return {
        'valid': `The vote will end at ${this.$store.dateRange[1].toLocaleString('en-GB')}`,
        'locked': 'The admin has locked this vote',
        'before': `The vote will open at ${this.$store.dateRange[0].toLocaleString('en-GB')}`,
        'after': `The vote has been closed since ${this.$store.dateRange[1].toLocaleString('en-GB')}`,
      }
    }
  }
}
</script>