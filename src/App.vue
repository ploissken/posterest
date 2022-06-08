<template>
  <v-app dark>
    <v-toolbar dense >
      post e-rest
    </v-toolbar>
    <v-main>
      <NewsList/>
    </v-main>
  </v-app>
</template>

<script>
import NewsList from '@/components/NewsList';

export default {
  name: 'App',

  components: {
    NewsList,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=PT+Serif&display=swap');
</style>
