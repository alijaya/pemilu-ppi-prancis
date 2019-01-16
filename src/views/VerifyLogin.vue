<template>
  <el-main class="verifylogin" v-loading.fullscreen.lock="!$store.initUser">
    <h1>Verify log in</h1>
  </el-main>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'verifylogin',
  data() {
    return {
    }
  },
  mounted() {
    if (this.$auth.isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn')
      window.localStorage.removeItem('emailForSignIn')
      if (email) {
        this.verify(email)
      } else {
        this.tryInputEmail()
      }
    } else {
      this.failToVerify()
    }
  },
  methods: {
    failToVerify() {
      this.$error('Fail to verify, please try again')
      this.$router.replace({ name: 'login' })
    },
    successToVerify() {
      this.$success(`${email} logged in`)
      this.$router.replace({ name: 'user' })
    },
    verify(email) {
      const loading = this.$loading({
        lock: true,
        text: 'Verify email',
      })
      this.$auth.signInWithEmailLink(email, window.location.href)
      .then(() => {
        this.successToVerify()
      })
      .catch(error => {
        if (error.code == 'auth/invalid-email') {
          this.$confirm('Wrong email, please input the correct one', 'Wrong Email', {
            confirmButtonText: 'Try Again',
            cancelButtonText: 'Cancel'
          })
          .then(() => {
            this.tryInputEmail()
          })
          .catch(() => {
            this.failToVerify()
          })
        } else { // auth/invalid-action-code
          this.$alert('Error to verify, please try again', 'Verification error', {
            confirmButtonText: 'OK',
            callback: () => {
              this.failToVerify()
            }
          })
        }
      })
      .finally(() => {
        loading.close()
      })
    },
    tryInputEmail() {
      this.$prompt('Verify your email', 'Verify', {
        confirmButtonText: 'Verify',
        cancelButtonText: 'Cancel'
      })
      .then(response => {
        const email = response.value
        this.verify(email)
      })
      .catch(() => {
        this.failToVerify()
      })
    }
  }
}
</script>

<style scoped>
</style>
