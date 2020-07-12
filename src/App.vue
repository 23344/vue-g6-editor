<template>
  <div id="app">
    <G6Editor mode="edit">

    </G6Editor>
  </div>
</template>

<script>
import G6Editor from './components/G6Editor'
export default {
  name: 'App',
  components:{ G6Editor}
}
</script>

<style>
html, body {
    overflow: hidden;
    margin: 0;
    font-size: 12px;
    /* my add */
}
#app{
  margin: 0;
  padding: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #79828a;
  /* height: 100%; */
}
</style>
