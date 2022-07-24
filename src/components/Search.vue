<template>
  <div>
    <a-button type="primary">
      {{ a }}
    </a-button>
  </div>
</template>
<script lang="ts" setup>
const a = ref(0)
onMounted(()=>{
  a.value = 2
})
</script>