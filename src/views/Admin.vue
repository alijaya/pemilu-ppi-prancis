<template>
  <el-main class="admin">
    <el-form ref="form" class="form" :inline="true" :model="newUserData">
      <el-form-item label="Name">
        <el-input v-model="newUserData.name" placeholder="Name" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="newUserData.email" placeholder="Email" />
      </el-form-item>
      <el-form-item label="Pass">
        <el-input v-model="newUserData.pass" placeholder="Pass" />
      </el-form-item>
      <el-form-item label="Pass">
        <el-button @click="addNewUser">Add</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="users">
      <el-table-column prop="name" label="Name"/>
      <el-table-column prop="email" label="Email"/>
      <el-table-column prop="pass" label="Pass"/>
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
import firebase from '@/scripts/firebaseConfigured'

export default {
  name: 'admin',
  data() {
    return {
      usersRef: null,
      users: [],
      newUserData: {
        name: '',
        email: '',
        pass: '',
      }
    }
  },
  created() {
    this._listeners = []
    this.usersRef = this.$db.collection('users')
    this.listenSnapshot(this.usersRef, snapshot => {
      this.users = []
      snapshot.forEach(doc => {
        const data = doc.data()
        data._id = doc.id
        this.users.push(data)
      })
    })
  },
  destroy() {
    for (let listener in this._listeners) {
      listener.unsubscribe()
    }
    this._listeners = null
  },
  methods: {
    listenSnapshot(ref, f) {
      this._listeners.push(ref.onSnapshot(f))
    },
    addNewUser() {
      const name = this.newUserData.name
      this.usersRef.add(this.newUserData)
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
      this.usersRef.doc(row._id).delete()
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
