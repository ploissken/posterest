<template>
  <v-app dark>
    <v-toolbar dense >
      post e-rest
    </v-toolbar>
    <v-main>
      <router-view/>
      <GoogleSignin />
    </v-main>
  </v-app>
</template>

<script>
import GoogleSignin from '@/components/GoogleSignin'

export default {
  name: 'App',

  components: {
    GoogleSignin
  },

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=PT+Serif&display=swap');
</style>
