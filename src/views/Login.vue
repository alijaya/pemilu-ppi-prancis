<template>
  <el-main class="login">
    <el-form :model="loginInfo" label-width="100px" @submit.native.prevent="login">
      <el-form-item>
        <h1>Please log in!</h1>
      </el-form-item>
      <el-form-item label="Email">
        <el-input placeholder="Email" v-model="loginInfo.email" />
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit" type="primary">Log In</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'login',
  data() {
    return {
      loginInfo: {
        email: '',
      },
    }
  },
  methods: {
    login() {
      const email = this.loginInfo.email
      this.loginInfo.email = ''
      // https://firebase.google.com/docs/auth/web/email-link-auth
      const actionCodeSettings = {
        url: `${process.env.VUE_APP_HOSTING}/verifylogin`,
        handleCodeInApp: true,
      }
      this.$auth.sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        // save email to localStorage
        window.localStorage.setItem('emailForSignIn', email)
        this.$alert(`Email sent to ${email}. Please check your email!`, 'Sent', {
          confirmButtonText: 'OK',
        })
      })
      .catch(error => {
        this.$error(error.message)
      })
    },
  }
}
</script>

<style scoped>
</style>
