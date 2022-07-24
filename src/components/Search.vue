<template>
  <div>
    <a-button type="primary">
      {{ a }}
    </a-button>
    <a-form-item />
  </div>
</template>
<script lang="ts" setup>
const a = ref(0)
onMounted(()=>{
  a.value = 2
})
</script>