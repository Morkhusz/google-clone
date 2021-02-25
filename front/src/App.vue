<template>
  <v-app>
    <v-card color="white" flat>
      <v-toolbar height="fit-content" color="white" class="py-10">
        <v-toolbar-title>
          <v-img width="120" :src="require('./assets/googlelogo.png')"></v-img>
        </v-toolbar-title>
        <v-autocomplete
          rounded
          v-model="search"
          :items="items"
          class="mx-4"
          clearable
          clear-icon
          hide-no-data
          hide-details
          label="Start Searching"
          solo
        ></v-autocomplete>
      </v-toolbar>
    </v-card>
    <v-main> </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  
  data: () => ({
    search: "",
    items: [],
  }),
};
</script>
<style scoped>
</style>