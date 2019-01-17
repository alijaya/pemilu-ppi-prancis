<template>
  <el-main class="admin">
    <h1>Vote Time</h1>
    <el-form :inline="true">
      <el-form-item>
        <el-switch
          v-model="isLocked"
          active-text="Locked"
          inactive-text="Unlocked"
          @change="onLockedChange" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          format="dd/MM/yyyy, HH:mm:ss"
          @change="onDateChange" />
      </el-form-item>
    </el-form>
    <h1>Registered Users</h1>
    <el-form ref="form" class="form" :inline="true" :model="newUserData">
      <el-form-item label="Name">
        <el-input v-model="newUserData.name" placeholder="Name" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="newUserData.email" placeholder="Email" />
      </el-form-item>
      <el-form-item label="PPI">
        <el-input v-model="newUserData.ppi" placeholder="PPI" />
      </el-form-item>
      <el-form-item>
        <el-button @click="addNewUser">Add</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="users">
      <el-table-column prop="name" label="Name" width="200"/>
      <el-table-column prop="email" label="Email" width="300"/>
      <el-table-column prop="ppi" label="PPI" width="150"/>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-delete"
            size="mini"
            circle
            @click="tryDeleteUser(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'admin',
  data() {
    return {
      dateRange: null,
      isLocked: false,
      controlRef: this.$db.collection('global').doc('control'),
      verifiedUsersRef: this.$db.collection('verified_users'),
      usersRef: this.$db.collection('users'),
      users: [],
      newUserData: {
        name: '',
        email: '',
        ppi: '',
      }
    }
  },
  mounted() {
    if (this.$store.isUserLoaded) {
      this.setup()
    } else {
      this.$store.$once('userLoaded', () => {
        this.setup()
      })
    }
  },
  methods: {
    setup() {
      this.dateRange = this.$store.dateRange
      this.isLocked = this.$store.isLocked

      const verifiedUsersRefUnsubscribe = this.verifiedUsersRef
      .onSnapshot(query => {
        this.users = []
        query.forEach(doc => {
          const data = doc.data()
          data._id = doc.id
          this.users.push(data)
        })
      })

      this.$store.$once('userLogout', () => {
        verifiedUsersRefUnsubscribe()
        this.users = []
      })
    },
    onLockedChange(value) {
      this.controlRef.update({
        locked: value
      })
      .then(() => {
        this.$success(`Vote is now ${value ? 'locked' : 'unlocked'}`)
      })
    },
    onDateChange(value) {
      if (!value) return
      const fromDate = this.$firebase.firestore.Timestamp.fromDate
      this.controlRef.update({
        startDate: fromDate(value[0]),
        endDate: fromDate(value[1])
      })
      .then(() => {
        this.$success(`Date changed: ${value[0].toLocaleString('en-GB')} to ${value[1].toLocaleString('en-GB')}`)
      })
    },
    addNewUser() {
      const data = {
        name: this.newUserData.name,
        email: this.newUserData.email,
        ppi: this.newUserData.ppi,
      }
        this.newUserData = {}
      this.verifiedUsersRef.where('email', '==', data.email).get()
      .then(query => {
        if (!query.empty) {
          const ref = query.docs[0].ref
          return ref.set(data)
          .then(() => {
            this.$success(`${data.email} updated`)
          })
        } else {
          return this.verifiedUsersRef.add(data)
          .then(() => {
            this.$success(`${data.email} added`)
          })
        }
      })
      .catch(error => {
        this.$error(error)
      })
    },
    deleteUser(row) {
      const name = row.name
      this.verifiedUsersRef.doc(row._id).delete()
      .then(() => {
        return this.usersRef.where('id_verified_users', '==', row._id).get()
      })
      .then(query => {
        const batch = this.$db.batch()
        query.forEach(doc => {
          batch.delete(doc.ref)
        })

        return batch.commit()
      })
      .then(() => {
        this.$success(`${name} deleted`)
      })
      .catch(error => {
        this.$error(error)
      })
    },
    tryDeleteUser(row) {
      this.$confirm(`Are you sure to delete ${row.name}?`, 'Delete', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'error'
      })
      .then(() => {
        this.deleteUser(row)
      })
    },
  }
}
</script>

<style scoped>
</style>
