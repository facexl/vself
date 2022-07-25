<template>
  <div>
    <Search :search-options="searchOptions" />
    <a-button>1</a-button>
  </div>
</template>
<script lang="ts" setup>
import Search from './components/Search.vue'
const searchOptions = ref([
  {
    type:'input',
    key:'name'
  }
])
</script>