<template>
  <v-menu
    v-model="menuOpen"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn small fab dark v-bind="attrs" v-on="on">
        <v-icon small dark> mdi-magnify </v-icon>
      </v-btn>
    </template>
    <v-card class="search-card-container">
      <v-text-field
        v-model="searchQuery"
        label="search"
        append-inner-icon="mdi-magnify"
        outlined
        clearable
        dense
        single-line
        append-icon="mdi-magnify"
      />
      <v-btn block @click="doSearch" :loading="loading" :disabled="loading">
        search
      </v-btn>
    </v-card>
  </v-menu>
</template>

<script>
import api from "@/plugins/api";

export default {
  name: "NewsSearch",

  data: () => ({
    loading: false,
    menuOpen: false,
    searchQuery: "collor",
  }),

  methods: {
    doSearch() {
      this.loading = true;
      api("/search")
        .post({ searchQuery: this.searchQuery })
        .then((news) => {
          this.$emit("news-search", news);
          console.log(news);
        })
        .catch((err) => console.error(err))
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style>
.search-card-container {
  width: 450px;
  padding: 1em;
}
</style>
