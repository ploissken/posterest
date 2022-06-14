<template>
  <span v-if="!isLogged" class="floating-signin">
    <div id="g_id_onload"
       :data-client_id="googleId"
       data-auto_select="true"
       :data-login_uri="loginUrl">
    </div>
    <div class="g_id_signin"
       data-type="standard"
       data-size="large"
       data-theme="outline"
       data-text="sign_in_with"
       data-shape="rectangular"
       data-logo_alignment="left">
    </div>
  </span>
  <span v-else>
    <v-btn class="logout-button"
      @click="logout"
      fab dark small color="black">
     <v-icon small dark>
       mdi-logout
     </v-icon>
    </v-btn>
  </span>
</template>

<script>
  export default {
    name: 'googleSignInButton',

    data: () => ({
      googleId: '635766190519-7m0ku503nfit589ed7ioq4lsvim90a83.apps.googleusercontent.com',
      isLogged: true
    }),

    mounted () {
      const userId = localStorage.getItem('user_id')
      if (!userId) {
        this.isLogged = false
      }
    },

    methods: {
      logout () {
        localStorage.clear()
        this.isLogged = false
      }
    },

    computed: {
      loginUrl () {
        return (process.env.NODE_ENV === 'production')
          ? 'https://pa.txto.com.br/xapa'
          : 'http://localhost:9000/xapa'
      }
    }
  }
</script>

<style>
.v-btn.logout-button,
.floating-signin {
  position: fixed;
  bottom: 4em;
  right: 2em;
}
</style>
