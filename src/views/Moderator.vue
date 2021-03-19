<template>
  <el-main class="moderator">
    <h1>Recap Votes</h1>
    <el-table
      :data="voteData"
      :default-sort = "{prop: 'ppi', order: 'ascending'}"
      show-summary>
      <el-table-column sortable prop="ppi" label="PPI" width="150"/>
      <el-table-column sortable align="right" prop="registered" label="Register" width="100"/>
      <el-table-column sortable align="right" prop="login" label="Login" width="100"/>
      <el-table-column sortable align="right" prop="no_vote" label="No Vote" width="100"/>
      <el-table-column sortable align="right" prop="abstain" label="Abstain" width="100"/>
      <el-table-column sortable align="right" prop="ridho" label="1. Ridho dan Avira" width="200"/>
      <el-table-column sortable align="right" prop="hazem" label="2. Hazem dan Yulia" width="200"/>
    </el-table>
    <h1>Registered Users ({{users.length}})</h1>
    <el-table
      :data="users"
      :default-sort = "{prop: 'name', order: 'ascending'}">
      <el-table-column sortable prop="name" label="Name" width="200"/>
      <el-table-column sortable prop="email" label="Email" width="300"/>
      <el-table-column sortable :filters="ppiFilters" :filter-method="filterHandler" prop="ppi" label="PPI" width="150"/>
    </el-table>
  </el-main>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'moderator',
  data() {
    return {
      verifiedUsersRef: this.$db.collection('verified_users'),
      usersRef: this.$db.collection('users'),
      voteDict: {},
      voteData: [],
      registeredDict: {},
      users: [],
      ppiFilters: [],
    }
  },
  mounted() {
    this.$store.checkUserLoaded().then(() => {
      this.setup()
    })
  },
  methods: {
    setup() {
      this.setupVoteCount()
      this.setupRegisteredUsers()
    },
    setupVoteCount() {
      const usersRefUnsubscribe = this.usersRef
      .onSnapshot(query => {
        this.voteDict = {}
        this.voteData = []
        query.forEach(doc => {
          const data = doc.data()
          const ppi = data.ppi
          if (!this.voteDict[ppi]) {
            // if not exist yet
            this.voteDict[ppi] = {ppi: ppi, registered: 0, login: 0, no_vote:0, abstain: 0, ridho: 0, hazem: 0}
            this.voteData.push(this.voteDict[ppi])
          }
          let key = 'no_vote'
          if (data.vote != null) {
            key = ['abstain', 'ridho', 'hazem'][data.vote]
          }
          this.voteDict[ppi].login++
          this.voteDict[ppi][key]++
        })
        this.updateRegistered()
      })

      this.$store.$once('userLogout', () => {
        usersRefUnsubscribe()
        this.voteDict = {}
        this.voteData = []
      })
    },
    setupRegisteredUsers() {
      const verifiedUsersRefUnsubscribe = this.verifiedUsersRef
      .onSnapshot(query => {
        this.registeredDict = {}
        this.users = []
        const ppis = {}
        query.forEach(doc => {
          const data = doc.data()
          data._id = doc.id
          this.users.push(data)
          ppis[data.ppi] = true

          if (!this.registeredDict[data.ppi]) {
            this.registeredDict[data.ppi] = 0
          }
          this.registeredDict[data.ppi]++
        })
        this.ppiFilters = []
        for (let ppi in ppis) {
          this.ppiFilters.push({text: ppi, value: ppi})
        }

        this.updateRegistered()
      })

      this.$store.$once('userLogout', () => {
        verifiedUsersRefUnsubscribe()
        this.users = []
      })
    },
    updateRegistered() {
      for (let ppi in this.voteDict) {
        this.voteDict[ppi].registered = 0
      }
      for (let ppi in this.registeredDict) {
        if (!this.voteDict[ppi]) {
          this.voteDict[ppi] = {ppi: ppi, registered: 0, login: 0, no_vote:0, abstain: 0, ridho: 0, hazem: 0}
          this.voteData.push(this.voteDict[ppi])
        }
        this.voteDict[ppi].registered = this.registeredDict[ppi]
      }
    },
    filterHandler(value, row, column) {
      return row[column['property']] === value
    }
  }
}
</script>

<style scoped>
</style>
