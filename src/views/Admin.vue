<template>
  <el-main class="admin">
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
      <el-table-column prop="name" label="Name"/>
      <el-table-column prop="email" label="Email"/>
      <el-table-column prop="ppi" label="PPI"/>
      <el-table-column width="200">
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
      const unsubscribe = this.verifiedUsersRef.onSnapshot(query => {
        this.users = []
        query.forEach(doc => {
          const data = doc.data()
          data._id = doc.id
          this.users.push(data)
        })
      })

      this.$store.$once('userLogout', () => {
        unsubscribe()
        this.users = []
      })
    },
    addNewUser() {
      const name = this.newUserData.name
      this.verifiedUsersRef.add(this.newUserData)
      .then(() => {
        this.$success(`${name} added`)
      })
      .catch(error => {
        this.$error(error)
      })
      this.newUserData = {}
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
.form {
  margin-top: 1em;
}
</style>
