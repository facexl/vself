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
                allow-clear
                :placeholder="item.placeholder as string || '请填写'"
                @keydown.enter="onSearch"
              />
            </a-form-item>
  
            <a-form-item
              v-if="item.type==='dateRange'"
              :name="item.key"
            >
              <a-range-picker
                v-model:value="searchForm[item.key]"
                format="YYYY-MM-DD"
                :placeholder="item.placeholder as [string,string] || ['选择开始时间', '选择结束时间']"
                style="width:260px"
                @keydown.enter="onSearch"
              />
            </a-form-item>
  
            <a-form-item
              v-if="item.type==='dateTimeRange'"
              :name="item.key"
            >
              <a-range-picker
                v-model:value="searchForm[item.key]"
                :show-time="{ format: 'HH:mm:ss' }"
                format="YYYY-MM-DD HH:mm:ss"
                :placeholder="item.placeholder as [string,string] || ['选择开始时间', '选择结束时间']"
                style="width:260px"
                @keydown.enter="onSearch"
              />
            </a-form-item>
  
            <a-form-item
              v-if="item.type === 'select'"
              :name="item.key"
            >
              <a-select
                v-model:value="searchForm[item.key]"
                style="width:180px"
                allow-clear
                :placeholder="item.placeholder || '请选择'"
                @keydown.enter="onSearch"
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
            <a-form-item
              v-if="item.type === 'cascader'"
              :name="item.key"
            >
              <a-cascader
                v-model:value="searchForm[item.key]"
                :options="item.options"
                :placeholder="item.placeholder || '请选择'"
                style="width:180px"
                @keydown.enter="onSearch"
              />
            </a-form-item>
          </div>
        </a-form>
      </div>
      <div class="right flex flex-no-wrap flex-no-shink">
        <a-button
          v-if="searchOptions.length"
          ref="searchButton"
          type="primary"
          class="search-btn ml8 mr8"
          @click="onSearch"
        >
          查询
        </a-button>
        <a-button 
          v-if="searchOptions.length" 
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
          <DownOutlined v-if="!isOpen" />
          <UpOutlined v-else />
        </a-button>
        <div
          class="flex ml8"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { DownOutlined,UpOutlined } from '@ant-design/icons-vue'


export interface Ops {
      label:string,
      value:string | number
  }
export interface SearchItem {
      type:string,
      key:string,
      options?:Ops[],
      defaultValue?:string,
      placeholder?:string|string[]
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
  
  
defineExpose({
  searchForm
})
  
  
const calculateOptionsLength = async ()=>{
  const nodeList = leftRef.value.querySelectorAll('.left-item')
  if(!nodeList.length)return
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
        res[keys[0]] = res[it.key][0]?.format('YYYY-MM-DD')
        res[keys[1]] = res[it.key][1]?.format('YYYY-MM-DD')
        delete res[it.key]
      }
    }
    if(it.type==='dateTimeRange'){
      if(res[it.key]){
        const keys = it.key.split('-')
        res[keys[0]] = res[it.key][0]?.format('YYYY-MM-DD HH:mm:ss')
        res[keys[1]] = res[it.key][1]?.format('YYYY-MM-DD HH:mm:ss')
        delete res[it.key]
      }
    }
    if(it.type==='cascader'){
      // 这个类型暂时取的最后一项id(商品分类他们是这么搞的 有其他情况再说)
      if(res[it.key]){
        res[it.key] = res[it.key]?res[it.key][res[it.key].length-1]:undefined
      }
    }
  })
  // 将空值设置成undefined
  for (let key in res) {
    if (res[key] === '') {
      res[key] = undefined
    }
  }
    
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