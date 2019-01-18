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
    <h1>Upload with XLSX</h1>
    <el-upload
      action="#"
      drag
      multiple
      :before-upload="onUpload">
      <i class="el-icon-upload" />
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    </el-upload>
    <h1>Add User</h1>
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
    <h1>Registered Users ({{users.length}})</h1>
    <el-button @click="makeUsersClean">Make Users Clean</el-button>
    <el-button @click="removeDuplicates">Remove Duplicates</el-button>
    <el-table
      :data="users"
      :default-sort = "{prop: 'name', order: 'ascending'}">
      <el-table-column sortable prop="name" label="Name" width="200"/>
      <el-table-column sortable prop="email" label="Email" width="300"/>
      <el-table-column :filters="ppiFilters" :filter-method="filterHandler" prop="ppi" label="PPI" width="150"/>
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
import XLSX from 'xlsx'

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
      },
      ppiFilters: [],
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
    cleanUpUser(user) {
      const result = { name: user.name, email: user.email, ppi: user.ppi}
      const toTitleCase = s => s.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase())
      const removeDouble = s => s.replace(/ +/g, ' ')
      if (user.name) result.name = toTitleCase(removeDouble(user.name.trim()))
      if (user.email) result.email = user.email.trim().toLowerCase()
      if (user.ppi) result.ppi = user.ppi.trim()
      return result
    },
    isCleanUser(user) {
      const cleanUser = this.cleanUpUser(user)
      return user.name == cleanUser.name && user.email == cleanUser.email && user.ppi == cleanUser.ppi
    },
    makeUsersClean() {
      this.verifiedUsersRef.get()
      .then(query => {
        const dirtyDoc = []
        query.forEach(doc => {
          const user = doc.data()
          if (!this.isCleanUser(user)) {
            dirtyDoc.push(doc)
          }
        })
        if (dirtyDoc.length == 0) {
          this.$success('Database has been already clean')
        } else {
          this.$confirm(`Found ${dirtyDoc.length} dirty users. Clean up?`, 'Clean Up')
          .then(() => {
            Promise.all(dirtyDoc.map(doc => {
              const cleanUser = this.cleanUpUser(doc.data())
              return doc.ref.set(cleanUser)
            }))
            .then(() => {
              this.$success('Database cleaned up')
            })
          })
          .catch(() => {
            this.$message('Cancel clean up')
          })
        }
      })
    },
    removeDuplicates() {
      this.verifiedUsersRef.get()
      .then(query => {
        const dict = {}
        const duplicatedDoc = []
        query.forEach(doc => {
          const user = this.cleanUpUser(doc.data())
          if (user.email in dict) {
            // duplicated!
            duplicatedDoc.push(user)
          } else {
            dict[user.email] = user
          }
        })

        if (duplicatedDoc == 0) {
          this.$success('No duplicated users')
        } else {
          this.$confirm(`Found ${duplicatedDoc.length} duplicated users. Remove duplicates?`, 'Remove Duplicates')
          .then(() => {
            Promise.all(duplicatedDoc.map(doc => {
              return doc.ref.delete()
            }))
            .then(() => {
              this.$success('Duplicates removed')
            })
          })
          .catch(() => {
            this.$message('Cancel remove duplicates')
          })
        }
      })
    },
    setup() {
      this.dateRange = this.$store.dateRange
      this.isLocked = this.$store.isLocked

      const verifiedUsersRefUnsubscribe = this.verifiedUsersRef
      .onSnapshot(query => {
        this.users = []
        const ppis = {}
        query.forEach(doc => {
          const data = doc.data()
          data._id = doc.id
          this.users.push(data)
          ppis[data.ppi] = true
        })
        this.ppiFilters = []
        for (let ppi in ppis) {
          this.ppiFilters.push({text: ppi, value: ppi})
        }
      })

      this.$store.$once('userLogout', () => {
        verifiedUsersRefUnsubscribe()
        this.users = []
      })
    },
    onUpload(file) {
      // https://github.com/SheetJS/js-xlsx
      const rABS = true // true: readAsBinaryString, false: readAsArrayBuffer
      const reader = new FileReader()
      reader.onload = event => {
        let data = event.target.result
        if (!rABS) data = new Uint8Array(data)
        const workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'})

        this.uploadWorkbook(workbook)
      }
      if (rABS) {
        reader.readAsBinaryString(file)
      } else {
        reader.readAsArrayBuffer(file)
      }
      return false
    },
    createUsersDisplay(users) {
      const h = this.$createElement
      // return h('ul', {
      //   style: {
      //     'max-height': '200px',
      //     'overflow-y': 'auto',
      //   }
      // }, users.map(user => h('li', null, user.email)))
      return h('el-table', {
        props: {
          data: users,
          height: 400,
        },
      }, [
        h('el-table-column', {
          props: {
            prop: 'name',
            label: 'Name',
            width: 250,
          }
        }),
        h('el-table-column', {
          props: {
            prop: 'email',
            label: 'Email',
            width: 250,
          }
        }),
        h('el-table-column', {
          props: {
            prop: 'ppi',
            label: 'PPI',
            width: 150,
          }
        })
      ])
    },
    uploadWorkbook(workbook) {
      const first_sheet_name = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[first_sheet_name]

      const data = XLSX.utils.sheet_to_json(worksheet, {header:1})
      .map(item => {
        return this.cleanUpUser({
          name: item[0], 
          email: item[1], 
          ppi: item[2]
        })
      })

      const h = this.$createElement
      const displayNode = 
      h('div', null, [
        h('p', null, `${data.length} users will be uploaded`),
        this.createUsersDisplay(data)
      ])
      this.$confirm(displayNode, 'Confirm upload')
      .then(() => {
        this.batchAddNewUsers(data)
      })
      .catch(() => {
        this.$message('Cancel uploading')
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
    batchAddNewUsers(users) {
      const addedUsers = []
      const updatedUsers = []
      const failedUsers = []
      const loading = this.$loading({
        lock: true,
        text: 'Uploading the files',
      })
      Promise.all(users.map(user => {
        if (user && user.name && user.email && user.ppi) {
          user = this.cleanUpUser(user)
          return this.verifiedUsersRef.where('email', '==', user.email).get()
          .then(query => {
            if (!query.empty) {
              const ref = query.docs[0].ref
              return ref.set(user)
              .then(() => {
                updatedUsers.push(user)
              })
            } else {
              return this.verifiedUsersRef.add(user)
              .then(() => {
                addedUsers.push(user)
              })
            }
          })
          .catch(() => {
            failedUsers.push(user)
          })
        } else {
          failedUsers.push(user)
        }
      }))
      .then(() => {
        const h = this.$createElement
        const displayNode = 
        h('el-collapse', {props: {accordion: true}}, [
          h('el-collapse-item', {props: {title: `Added ${addedUsers.length} users`}}, [
            this.createUsersDisplay(addedUsers)
          ]),
          h('el-collapse-item', {props: {title: `Updated ${updatedUsers.length} users`}}, [
            this.createUsersDisplay(updatedUsers)
          ]),
          h('el-collapse-item', {props: {title: `Failed ${failedUsers.length} users`}}, [
            this.createUsersDisplay(failedUsers)
          ]),
        ])
        this.$alert(displayNode, 'Summary', {
          callback: () => {}
        })
      })
      .finally(() => {
        loading.close()
      })
    },
    addNewUser() {
      const data = this.cleanUpUser(this.newUserData)
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
    filterHandler(value, row, column) {
      return row[column['property']] === value
    }
  }
}
</script>

<style scoped>
</style>
