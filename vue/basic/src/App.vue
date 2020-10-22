<template>
  <div id="app">
    <Flatfile msg="Flatfile + Vue"/>
  </div>
</template>

<script>
import Flatfile from "./components/Flatfile.vue"

export default {
  name: 'App',
  components: {
    Flatfile
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
