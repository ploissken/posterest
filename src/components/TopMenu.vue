<template>
  <v-container>
    <vue-topprogress ref="topProgress" color="#F44" />
    <v-menu
      transition="slide-x-transition"
      bottom
      right
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2"
          v-bind="attrs"
          v-on="on"
          fab
          dark
          small
          color="black"
        >
          <v-icon small dark> mdi-eye </v-icon>
        </v-btn>
      </template>
      <v-list>
        <h5 class="ml-4">mostrar/esconder fontes</h5>
        <v-list-item v-for="(item, i) in sources" :key="i">
          <v-list-item-title>
            <v-checkbox
              @change="$emit('filterSource', item.source)"
              color="primary"
              off-icon="mdi-eye"
              on-icon="mdi-eye-off"
              :value="item.source"
            >
              <template v-slot:label>
                <p class="my-0">{{ clearSource(item.source) }}</p>
                <v-chip class="ml-2" x-small outlined color="primary">
                  {{ item.count }}
                </v-chip>
              </template>
            </v-checkbox>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>

<script>
import { vueTopprogress } from "vue-top-progress";

export default {
  name: "TopMenu",

  components: {
    vueTopprogress,
  },

  props: {
    sources: [],
  },

  data: () => ({
    hideSources: [],
  }),

  mounted() {
    window.addEventListener(
      "scroll",
      (evt) => {
        const scrollPercentage =
          (evt.target.scrollTop * 100) / (evt.target.scrollHeight - 560);
        this.$refs.topProgress?.set(scrollPercentage);
      },
      true
    );
  },
};
</script>
