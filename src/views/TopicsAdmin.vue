<template>
  <v-container fluid
    style="width: 90%; margin: auto;">
    <v-row>
      <v-col cols="12">
        <h2> Topics </h2>
      </v-col>
      <v-col cols="3">
        tag
      </v-col>
      <v-col cols="6">
        keywords
      </v-col>
      <v-col cols="3">
        owner
      </v-col>
    </v-row>
    <v-row v-for="(topic, index) in topics" :key="index">
      <v-col cols="3">
        <v-text-field v-if="topic.id === editing"
          v-model="editingTag"
          label="Tag"
          outlined
        />
        <v-chip v-else dark color="yellow">
          {{ topic.tag }}
        </v-chip>
      </v-col>
      <v-col cols="6">
        <v-textarea v-if="topic.id === editing"
          v-model="editingKeywords"
          outlined
          rows="2"
          label="keywords"
          :value="topic.keywords"
        />
        <span v-else>
          {{ topic.keywords }}
        </span>
      </v-col>
      <v-col cols="1">
        {{ topic.owner_id }}
      </v-col>
      <v-col cols="2">
        <v-btn v-if="topic.id === editing"
          x-small fab color="red"
          :loading="loading === topic.id"
          @click="updateTopic()">
          <v-icon color="black"> mdi-content-save </v-icon>
        </v-btn>
        <v-btn v-else
          x-small fab icon
          @click="editing = topic.id">
          <v-icon color="yellow"> mdi-pencil </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-col cols="3">
        <v-text-field
          v-model="newTag"
          label="Tag"
          outlined
        />
      </v-col>
      <v-col cols="6">
        <v-textarea
          v-model="newKeywords"
          outlined
          rows="2"
          label="keywords"
          value=""
        />
      </v-col>
      <v-col cols="1">
        <h3>0</h3>
      </v-col>
      <v-col cols="2">
        <v-btn x-small fab color="red"
          :loading="loading === 'new'"
          @click="createTopic()">
          <v-icon color="black"> mdi-plus </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import api from '@/plugins/api'

export default {
  data: () => ({
    topics: [],
    newTag: '',
    loading: undefined,
    editing: undefined,
    editingTag: '',
    editingKeywords: '',
    newKeywords: ''
  }),

  watch: {
    editing (id) {
      const editingItem = this.topics.find(t => t.id === id)
      this.editingKeywords = editingItem?.keywords
      this.editingTag = editingItem?.tag
    }
  },

  mounted () {
    api('/topics').get()
    .then(response => {
      console.log('got topics', response)
      this.topics = response
    })
  },

  methods: {
    createTopic () {
      this.loading = 'new'
      const newTopic = {
        tag: this.newTag,
        keywords: this.newKeywords,
        owner_id: 0,
      }

      api('/new-topic').post(newTopic)
        .then(response => {
          console.log('le response is', response)
          this.topics.push(response)
          this.loading = undefined
        })
    },

    updateTopic () {
      this.loading = this.editing
      const updatedTopic = {
        tag: this.editingTag,
        keywords: this.editingKeywords,
        owner_id: 0,
        id: this.editing
      }

      api('/new-topic').post(updatedTopic)
        .then(response => {
          console.log('le response is', response)
          const topicIndex = this.topics
            .map(t => t.id)
            .indexOf(this.editing)
          this.topics[topicIndex] = {
            ...response
          }
          this.loading = undefined
          this.editing = undefined
        })
    }
  }
}

</script>
