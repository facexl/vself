<template>
  <div>
    <Search :search-options="searchOptions" />
    <!-- <a-button>1</a-button> -->
  </div>
</template>
<script lang="ts" setup>
import { Search } from './components';
// import 'vself/dist/style.css'
const searchOptions = ref([
  {
    type:'input',
    key:'name'
  },
  {
    type:'input',
    key:'name'
  }
  ,
  {
    type:'input',
    key:'name'
  },
  {
    type:'input',
    key:'name'
  }
  ,
  {
    type:'input',
    key:'name'
  }
])
</script>