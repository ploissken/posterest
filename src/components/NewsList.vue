<template>
  <v-container v-if="!news" class="mt-12 mx-4">
    <v-row>
      <v-col cols="7">
        <v-skeleton-loader type="button"/>
      </v-col>
      <v-col v-for="n in 20" :key="n" cols="7">
        <v-skeleton-loader class="loader" type="list-item"/>
      </v-col>
    </v-row>
  </v-container>

  <v-container fluid class="mt-12 mx-4" v-else>
    <!-- todo: make menu a self-contained component -->
    <v-menu transition="slide-x-transition"
      bottom right
      :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-2 filter-button"
          v-bind="attrs"
          v-on="on"
          fab dark small color="black">
         <v-icon small dark>
           mdi-eye
         </v-icon>
        </v-btn>
      </template>
      <v-list>
        <h5 class="ml-4"> mostrar/esconder fontes </h5>
        <v-list-item
          v-for="(item, i) in sources"
          :key="i">
          <v-list-item-title>
            <v-checkbox
              @change="filterSource(item.source)"
              color="primary"
              off-icon="mdi-eye"
              on-icon="mdi-eye-off"
              :value="item.source">
              <template v-slot:label>
                <p class="my-0"> {{ clearSource(item.source) }} </p>
                <v-chip class="ml-2"
                  x-small outlined color="primary">
                  {{ item.count }}
                </v-chip>
              </template>
          </v-checkbox>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- todo: make menu a self-contained component -->

    <v-row v-for="dailyNews in news"
      :key="dailyNews.date"
      class="d-flex align-start">
      <v-col cols="12">
        <p>
          {{ $dayjs(dailyNews.date).format('D/MM') }}
          <v-chip outlined x-small class="ml-2">
            last updated {{ $dayjs(dailyNews.news[0].created_at).fromNow() }}
          </v-chip>
        </p>
      </v-col>

      <v-col v-for="post in filteredNews(dailyNews.news)"
        :key="post.id"
        cols="12">
        <p>
          <a class="news-link" :href="post.href" target="_blank">
            {{ post.title }}
          </a>
          | {{ clearSource(post.source) }}
          <v-chip x-small outlined black>
            {{ $dayjs(post.created_at).fromNow() }}
          </v-chip>
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-btn outlined
          @click="loadMore"
          :loading="loading">
          load more
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/plugins/api'

  export default {
    name: 'HelloWorld',

    data: () => ({
      news: undefined,
      currentDate: undefined,
      hideSources: [],
      loading: false
    }),

    mounted () {
      api('/news').get()
        .then(news => {
          this.currentDate = this.$dayjs().format()
          this.news = [
            {
              date: this.currentDate,
              news: news
            }
          ]
        }).catch(err => console.error(err))
    },

    methods: {
      loadMore () {
        this.loading = true
        console.log('this.currentDate was', this.currentDate)
        this.currentDate = this.$dayjs(this.currentDate)
          .subtract(1, 'day')
          .format()
        console.log('this.currentDate is', this.currentDate)
        api('/load-more-news').post({
          date: this.currentDate
        }).then(news => {
          this.news.push({
            date: news[0].created_at,
            news: news
          })
          this.loading = false
        }).catch(err => console.error(err))
      },

      clearSource(source) {
        return source
          .replace('https://www.', '')
          .replace('https://', '')
          .replace('http://www.', '')
          .replace('http://', '')
          .replace('/brasil/', '')
          .replace('/', '')
      },

      filterSource (clickedSource) {
        if (this.hideSources.indexOf(clickedSource) >= 0) {
          this.hideSources = this.hideSources
            .filter(source => source !== clickedSource)
        } else {
          this.hideSources.push(clickedSource)
        }
      },

      filteredNews (newsArray) {
        return newsArray.filter(news => this.hideSources.indexOf(news.source) < 0)
      }
    },

    computed: {
      sources () {
        let count = {}
        this.news
          .map(daily => daily.news.map(news => news.source))
          .forEach(day => {
            day.forEach(source => {
              if (!count[source]) count[source] = 0
              count[source]++
            })
          })
        return Object.keys(count).map(key => {
          return {
            source: key,
            count: count[key]
          }
        })
      }
    }
  }
</script>

<style lang="scss">
p {
  font-family: 'PT Serif', serif;
  font-size: 0.9em;
}
.v-btn.filter-button {
  position: fixed;
  top: 2em;
  right: 2em;
}
.loader {
 .v-skeleton-loader__list-item {
   background: transparent!important;
 }
}
.news-link {
  color: #F44;
  text-decoration: none;
  transition: all 0.5s;
  &:hover {
    opacity: 0.6;
  }
}
</style>
