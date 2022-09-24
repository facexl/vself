<template>
  <div>
    <Search :search-options="searchOptions" />
  </div>
</template>

<script lang='ts' setup>
import { Search } from 'vself';
import { ref } from 'vue'
const searchOptions = ref([
  {
    type:'input',
    key:'name'
  }
])
</script>

<style lang='less' scoped>

</style>