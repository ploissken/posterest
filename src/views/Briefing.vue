<template>
  <v-container v-if="!groupedNews" class="mt-12 mx-4">
    <v-row>
      <v-col cols="7">
        <v-skeleton-loader type="button"/>
      </v-col>
      <v-col v-for="n in 20" :key="n" cols="7">
        <v-skeleton-loader class="loader" type="list-item"/>
      </v-col>
    </v-row>
  </v-container>

  <v-container fluid class="news-container" v-else>
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

    <!-- todo: make this lazy loaded -->
    <v-row v-for="group in groupedNews"
      :key="group.topic"
      class="d-flex align-start">
      <v-col cols="12">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              v-bind="attrs"
              v-on="on">
              {{ group.pool.length }}
            </v-chip>
          </template>
          <span>{{ groupKeywords(group.pool) }}</span>
        </v-tooltip>
      </v-col>
      <v-col cols="12">
        <v-slide-group show-arrows>

          <v-slide-item
            v-for="post in group.pool"
            :key="post.id">
            <v-card
              class="ma-4"
              height="200"
              width="200">
              <v-card-text style="height: 160px;">
                <a class="news-link card" :href="post.href" target="_blank">
                  {{ post.title }}
                </a>
                {{ post.image }}
              </v-card-text>
              <v-card-actions style="height: 40px;">
                <v-icon v-if="loggedUserId"
                  @click="toggleFav(post.id)"
                  :ripple="false"
                  color="yellow" class="mr-2"
                  :class="{ 'toggling-fav': savingNews === post.id }">
                  {{
                    favorites.indexOf(`${post.id}`) >= 0
                      ? 'mdi-star'
                      : 'mdi-star-outline'
                  }}
                </v-icon>
                <span style="color: white;">
                  {{ ` | ${clearSource(post.source)}` }}
                </span>
                <v-chip x-small :style="{
                  position: 'absolute',
                  top: 0,
                  right: 0
                  }">
                  {{ parseFloat(post.rating).toFixed(3) }}
                </v-chip>
             </v-card-actions>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-chip> {{ ungroupedNews.length }} ungrouped </v-chip>
      </v-col>
      <v-col v-for="post in ungroupedNews"
        :key="post.id"
        cols="12">
        <p class="d-flex align-center">
          <v-icon v-if="loggedUserId"
            @click="toggleFav(post.id)"
            :ripple="false"
            color="yellow" class="mr-2"
            :class="{ 'toggling-fav': savingNews === post.id }">
            {{
              favorites.indexOf(`${post.id}`) >= 0
                ? 'mdi-star'
                : 'mdi-star-outline'
            }}
          </v-icon>
          <a class="news-link" :href="post.href" target="_blank">
            {{ post.title }}
            <span style="color: white;">
              {{ ` | ${clearSource(post.source)}` }}
            </span>
          </a>
        </p>
      </v-col>
      <!-- <v-col cols="3"> -->
        <!-- <p v-for="n in ungroupedNews.map(n => n.title)"
          :key="n">
          {{ n }}
        </p> -->
        <!-- <v-btn outlined
          @click="loadMore"
          :loading="loading">
          load more
        </v-btn> -->
      <!-- </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import api from '@/plugins/api'

  export default {
    name: 'YourBriefing',

    data: () => ({
      news: undefined,
      mainTopics: undefined,
      groupedNews: undefined,
      ungroupedNews: undefined,
      currentDate: undefined,
      hideSources: [],
      loading: false,
      favorites: [],
      groupingThreshold: 0.46,
      savingNews: undefined
    }),

    mounted () {
      api('/news').get()
        .then(response => {
          this.currentDate = this.$dayjs().format()
          this.news = [
            {
              date: this.currentDate,
              news: response.news.map(n => {
                return {
                  ...n,
                  keywords: this.extractKeywords(n.title)
                }
              })
            }
          ]
          this.favorites = [ ...response.favorites ]

          const l1merge = this.detectSimilarities(this.news[0].news, 'keywords')

          let l2 = l1merge
            .sort((a, b) => b.rating - a.rating)
            .filter(merged => merged.rating >= 0.57 && merged.rating < 1)

          let l2merge = this.detectSimilarities(l2, 'unique')

          this.mainTopics = l2merge.map(n => n.unique)
          this.groupThruTopics()

        }).catch(err => console.error(err))
    },

    methods: {
      groupKeywords (pool) {
        let words = {}
        pool.forEach(news => {
          news.keywords.match(/\w+/g).forEach(word => {
            if (!words[word]) words[word] = 0
            words[word]++
          })
        })
        Object.keys(words).forEach(word => {
          if (words[word] === 1) {
            delete words[word]
          }
        })
        return words
      },

      detectSimilarities (sourceArray, compareKey) {
        let bestMatches = []

        sourceArray.forEach(n => {
          const referenceString = n[compareKey]
          let closets = window.stringSimilarity.findBestMatch(
            referenceString,
            sourceArray.map(n => n[compareKey])
          )

          const sorted = closets.ratings
            .filter(n => n.rating < 1)
            .sort((a, b) => b.rating - a.rating)
          const best = sorted[0]

          const uniqueSum = Array.from(
            new Set(`${referenceString} ${best.target}`.split(' '))
          )

          if (best.rating > this.groupingThreshold) {
            bestMatches.push({
              ref: referenceString,
              target: best.target,
              unique: uniqueSum.join(' '),
              rating: best.rating
            })
          }

        })

        return bestMatches
      },

      groupThruTopics () {
        let newsPool = [ ...this.news[0].news ]
        let groups = []
        this.mainTopics.forEach(topic => {
          newsPool = newsPool.map(news => {
            return {
              ...news,
              rating: window.stringSimilarity.compareTwoStrings(
                topic,
                news.keywords
              )
            }
          })

          groups.push({
            topic: topic,
            pool: newsPool.filter(n => n.rating > this.groupingThreshold)
              .sort((a, b) => b.rating - a.rating)
          })

          newsPool = newsPool.filter(n => n.rating <= this.groupingThreshold)
        })

        this.groupedNews = groups
          .filter(g => g.pool.length > 1)
          .sort((a, b) => b.pool.length - a.pool.length)

        this.ungroupedNews = newsPool
      },

      extractKeywords (str) {
        return str
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .replace(/ o /g, ' ')
          .replace(/"/g, '')
          .replace(/“/g, '')
          .replace(/”/g, '')
          .replace(/'/g, '')
          .replace(/:/g, '')
          .replace(/;/g, '')
          .replace(/,/g, '')
          .replace(/\(/g, '')
          .replace(/\)/g, '')
          .replace(/\./g, '')
          .replace(/ a /g, ' ')
          .replace(/ os /g, ' ')
          .replace(/ as /g, ' ')
          .replace(/ ao /g, ' ')
          .replace(/ aos /g, ' ')
          .replace(/ no /g, ' ')
          .replace(/ na /g, ' ')
          .replace(/ nos /g, ' ')
          .replace(/ nas /g, ' ')
          .replace(/ de /g, ' ')
          .replace(/ da /g, ' ')
          .replace(/ das /g, ' ')
          .replace(/ do /g, ' ')
          .replace(/ dos /g, ' ')
          .replace(/ com /g, ' ')
          .replace(/ tem /g, ' ')
          .replace(/ pela /g, ' ')
          .replace(/ pelo /g, ' ')
          .replace(/ por /g, ' ')
          .replace(/ para /g, ' ')
          .replace(/ se /g, ' ')
          .replace(/ que /g, ' ')
          .replace(/ diz /g, ' ')
          .replace(/ e /g, ' ')
          .replace(/ em /g, ' ')
          .replace(/ dcm cafe da manha /g, ' ')
          .replace(/ dcm meio dia /g, ' ')
          .replace(/ dcm /g, ' ')
      },

      loadMore () {
        this.loading = true
        this.currentDate = this.$dayjs(this.currentDate)
          .subtract(1, 'day')
          .format()

        api('/load-more-news').post({
          date: this.currentDate
        }).then(response => {
          this.news.push({
            date: response.news[0].created_at,
            news: response.news
          })
          this.favorites = [
            ...this.favorites,
            ...response.favorites
          ]
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
          .replace('/ultimas/', '')
          .replace('/', '')
          .replace('diariodocentrodomundo', 'dcm')
          .replace('piaui.folha.uol.com.br', 'piaui')
          .replace('.com.br', '')
          .replace('.com', '')
          .replace('.org', '')
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
      },

      toggleFav (newsId) {
        this.savingNews = newsId
        if (this.favorites.indexOf(newsId + '') >= 0) {
          this.favorites = this.favorites
            .filter(favorite => favorite !== `${newsId}`)
        } else {
          this.favorites.push(`${newsId}`)
        }
        this.$nextTick(() => {
          api('/toggle-fav').post({
            newsId: newsId,
            userId: this.loggedUserId
          }).finally(() => {
            this.savingNews = undefined
          })
        })

      },
    },

    computed: {
      loggedUserId () {
        return localStorage.getItem('user_id')
      },

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
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.toggling-fav {
  animation: rotation 1.5s infinite linear;
}

.news-container {
  width: 100%;
  height: 80vh;
  overflow-y: auto;
}

p {
  font-family: 'PT Serif', serif;
  font-size: 0.9em;
}
.v-btn.filter-button {
  position: fixed;
  top: 4em;
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
