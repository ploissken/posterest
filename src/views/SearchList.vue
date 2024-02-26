<template>
  <v-container fluid class="news-container ma-0 pa-0">
    <v-row class="ma-2 pa-0">
      <v-spacer />
      <NewsSearch @news-search="setNews" />
    </v-row>
    <v-container v-for="{ year, months } in news" :key="year" class="ma-0 pa-0">
      <v-row
        v-for="{ month, monthlyNews } in months"
        :key="month"
        class="ma-0 pa-0"
      >
        <v-col cols="12">
          <v-chip outlined x-small>
            {{ `${month} / ${year}` }}
          </v-chip>
        </v-col>
        <NewsItem
          v-for="post in monthlyNews"
          :post="post"
          :key="post.id"
          :favorites="[]"
        />
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import NewsSearch from "@/components/NewsSearch";
import NewsItem from "@/components/NewsItem";

export default {
  name: "NewsList",

  components: {
    NewsItem,
    NewsSearch,
  },

  data: () => ({
    news: undefined,
    currentDate: undefined,
    hideSources: [],
    loading: false,
    favorites: [],
    savingNews: undefined,
  }),

  mounted() {},

  methods: {
    setNews({ news }) {
      // filter by year
      const smallerYearInList = Math.min(
        ...news.map((news) => this.$dayjs(news.created_at).year())
      );
      let parsedNews = [];
      const yearsWithNews = Array.from(
        { length: this.$dayjs().year() - smallerYearInList },
        (value, index) => smallerYearInList + index
      ).reverse();
      const monthNumbers = Array.from(
        { length: 12 },
        (value, index) => index + 1
      );

      yearsWithNews.forEach((year) => {
        let yearsNews = {
          year,
          months: [],
          total: 0,
        };
        const newsOnThatYear = news.filter(
          (newsItem) => this.$dayjs(newsItem.created_at).year() === year
        );
        monthNumbers.forEach((month) => {
          let monthlyNews = newsOnThatYear.filter(
            (newsItem) => this.$dayjs(newsItem.created_at).month() + 1 === month
          );
          if (monthlyNews.length) {
            yearsNews.total = yearsNews.total + monthlyNews.length;
            yearsNews.months.unshift({ month, monthlyNews });
          }
        });

        if (yearsNews.total) {
          parsedNews.push(yearsNews);
        }
      });
      console.log("parsedNews", parsedNews);
      this.news = parsedNews;
    },
  },

  computed: {},
};
</script>

<style lang="scss">
.news-container {
  width: 100%;
  height: calc(100vh - 60px);
  padding-bottom: 120px;
  overflow-y: auto;
}
</style>
