<template>
  <v-app>
    <v-card color="white" flat>
      <v-toolbar height="fit-content" color="white" class="py-10">
        <v-toolbar-title>
          <v-img width="120" :src="require('./assets/googlelogo.png')"></v-img>
        </v-toolbar-title>
        <v-autocomplete
          rounded
          v-model="model"
          :items="items"
          :item-text="`title`"
          :item-value="`url`"
          auto-select-first
          no-filter
          class="mx-4"
          clearable
          clear-icon
          hide-no-data
          hide-details
          label="Start Searching"
          :search-input.sync="search"
          solo
        ></v-autocomplete>
      </v-toolbar>
    </v-card>
    <v-main class="px-5 py-5">
      <v-card class="mb-1" v-for="(item, index) in items" :key="index">
        <v-card-text>
          <div>{{ item.url }}</div>
          <p class="display-1 text--primary">{{ item.title }}</p>
          <div class="text--primary">
            relating to or dependent on charity; charitable...
          </div>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  components: {},
  created() {},
  data: () => ({
    model: "",
    search: "",
    items: [],
  }),
  watch: {
    search: function (search) {
      this.items = [];
      axios
        .get(`http://api.google.test/search?search=${search}`)
        .then((res) => {
          let results = res.data.results;
          results.map((result) => {
            if (!result._source.title) return;
            this.items.push(result._source);
          });
        })
        .catch((error) => {
          error;
        });
    },
  },
};
</script>
<style scoped>
</style>