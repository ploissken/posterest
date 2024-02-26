<template>
  <v-col cols="12">
    <p class="d-flex align-center">
      <!-- todo: toggleFav -->
      <v-icon
        @click="$emit('toggleFav', post.id)"
        :ripple="false"
        color="yellow"
        class="mr-2"
      >
        {{
          favorites.indexOf(`${post.id}`) >= 0 ? "mdi-star" : "mdi-star-outline"
        }}
      </v-icon>
      <a class="news-link" :href="post.href" target="_blank">
        {{ post.title }}
        <span style="color: white">
          {{ ` | ${clearSource(post.source)}` }}
        </span>
      </a>
    </p>
  </v-col>
</template>

<script>
export default {
  name: "NewsItem",
  props: {
    post: {},
    favorites: [],
  },
  methods: {
    clearSource(source) {
      return source
        .replace("https://www.", "")
        .replace("https://", "")
        .replace("http://www.", "")
        .replace("http://", "")
        .replace("/brasil/", "")
        .replace("/ultimas/", "")
        .replace("/", "")
        .replace("diariodocentrodomundo", "dcm")
        .replace("piaui.folha.uol.com.br", "piaui")
        .replace(".com.br", "")
        .replace(".com", "")
        .replace(".org", "");
    },
  },
};
</script>
