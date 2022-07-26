<template>
  <div>
    <div class="flex flex-no-warp">
      <div
        ref="leftRef"
        class="left"
        :class="{isOpen:isOpen}"
      >
        <a-form
          ref="searchRef"
          name="search-form"
          class="flex flex-wrap"
          style="width:100%"
          :model="searchForm"
        >
          <div
            v-for="item in searchOptions"
            :key="item.key"
            class="mr8 left-item"
          >
            <a-form-item
              v-if="item.type==='input'"
              :name="item.key"
            >
              <a-input
                v-model:value="searchForm[item.key]"
                clearable
                :placeholder="item.placeholder || '请填写'"
              />
            </a-form-item>
            <a-form-item
              v-if="item.type==='dateRange'"
              :name="item.key"
            >
              <!-- TODO: 还没对接key -->
              <a-range-picker
                v-model:value="searchForm[item.key]"
                format="YYYY-MM-DD"
                :placeholder="item.placeholder || ['选择开始时间', '选择结束时间']"
              />
            </a-form-item>
            <a-form-item
              v-if="item.type === 'select'"
              :name="item.key"
            >
              <a-select
                v-model:value="searchForm[item.key]"
                style="width:180px"
                clearable
                :placeholder="item.placeholder || '请选择'"
              >
                <a-select-option
                  v-for="it in item.options"
                  :key="it.value"
                  :value="it.value"
                >
                  {{ it.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-form>
      </div>
      <div class="right flex flex-no-wrap flex-no-shink">
        <a-button
          ref="searchButton"
          type="primary"
          class="search-btn ml8 mr8"
          @click="onSearch"
        >
          查询
        </a-button>
        <a-button 
          plain 
          @click="reset"
        >
          重置
        </a-button>
        
        <a-button
          v-if="showOpenTrigger"
          type="link"
          @click="isOpen=!isOpen"
        >
          {{ isOpen?'收起':'展开' }}
          <!-- <a-icon
            class="receive-icon"
            :class="{'open-icon':isOpen}"
          ><arrow-down /></a-icon> -->
        </a-button>
        <div class="flex ml8">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

interface Ops {
    label:string,
    value:string | number
}
interface SearchItem {
    type:string,
    key:string,
    options?:Ops[],
    defaultValue?:string,
    placeholder?:string
}

const props = defineProps<{
    searchOptions:SearchItem[]
}>()

const emit = defineEmits(['onSearch'])

const searchForm = ref({});

const leftRef = ref()

const searchRef = ref()

const isOpen = ref(false)

// 是否展示开关  
const showOpenTrigger = ref(false)

props.searchOptions.forEach(it => {
  searchForm.value[it.key] = it.defaultValue
});


const calculateOptionsLength = async ()=>{
  const nodeList = leftRef.value.querySelectorAll('.left-item')
  //   console.log(nodeList[nodeList.length-1].offsetTop)
  // 存在第二行
  if(nodeList[nodeList.length-1].offsetTop !== leftRef.value.offsetTop){
    showOpenTrigger.value = true
  }
}

watch(()=>props.searchOptions,async ()=>{
  await nextTick()
  if(leftRef.value){
    calculateOptionsLength()
  }else{
    await nextTick()
    calculateOptionsLength()
  }
},{
  immediate:true,
  deep:true
})


const onSearch = ()=>{
  const res = {...searchForm.value}
  props.searchOptions.forEach(it=>{
    if(it.type==='dateRange'){
      if(res[it.key]){
        const keys = it.key.split('-')
        res[keys[0]] = res[it.key][0].format('YYYY-MM-DD')
        res[keys[1]] = res[it.key][1].format('YYYY-MM-DD')
        delete res[it.key]
      }
    }
  })
  emit('onSearch',res)
}
const reset = ()=>{
  searchRef.value && searchRef.value.resetFields()
  emit('onSearch',{})
}

</script>

<style lang="less" scoped>
.left{
    max-width:65%;
    height:50px;
    overflow: hidden;
}
.isOpen{
    height:auto;
    overflow: visible;
}
.right{
    width:30%;
}
.receive-icon{
    transition: all .3s;
}
.open-icon{
    transform: rotate(180deg);
}
</style>