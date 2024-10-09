<template>
  <v-app dark class="fill-screen">
    <v-toolbar dense max-height="48px"> post e-rest </v-toolbar>
    <v-main class="mx-2">
      <router-view />
      <GoogleSignin />
    </v-main>
  </v-app>
</template>

<script>
import GoogleSignin from "@/components/GoogleSignin";

export default {
  name: "App",
  components: {
    GoogleSignin,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=PT+Serif&display=swap");
body::-webkit-scrollbar {
  display: none;
}

.fill-screen {
  width: 100vw;
  height: 100vh;
}
</style>
