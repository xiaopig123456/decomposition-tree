<script setup lang="ts">
import { ref } from 'vue';

const treeData = ref([
  {
    id: '1',label:'点击展开', children: [
      {
        id: '1-1', children: [
          {
            id: '1-1-1', children: [
              { id: '1-1-1-1' },
            ]
          },
          { id: '1-1-2' },
        ]
      },
      { id: '1-2',label:'异步加载' },
      {
        id: '1-3', children: [
          {
            id: '1-3-1', children: [
              { id: '1-3-1-1' },
            ]
          },
          { id: '1-3-2' },
        ]
      },
      { id: '1-4',label:'没有子节点' },
      { id: '1-5',children: [
          { id: '1-5-1' },
        ]
      },
      {
        id: '1-6', children: [
          {
            id: '1-3-1', children: [
              { id: '1-3-1-1' },
              { id: '1-3-1-2' },
              { id: '1-3-1-3' },
              { id: '1-3-1-4' },
              { id: '1-3-1-5' },
              { id: '1-3-1-6' },
              { id: '1-3-1-7' },
              { id: '1-3-1-8' },
            ]
          },
          { id: '1-3-2' },
        ]
      },
    ]
  },
  {
    id:'2',children: [
      { id: '2-1',children:  [
          { id: '2-1-1' },
          { id: '2-1-2' },
          { id: '2-1-3' },
          { id: '2-1-4' },
          { id: '2-1-5' },
          { id: '2-1-6' },
          { id: '2-1-7' },
          { id: '2-1-8' }
        ] },
      { id: '2-2' },
      { id: '2-3' },
    ]
  }
]);

const loading = ref(false);
function onDecompositionTreeClick(item: any) {
  // 异步加载示例
  if (item.id === '1-2' && !treeData.value[0].children[1]?.children?.length) {
    loading.value = true;
    setTimeout(() => {
      treeData.value[0].children[1].children = [
        { id: '1-2-1' },
        { id: '1-2-2' },
        { id: '1-2-3' },
      ];
      loading.value = false;
    }, 1000);
  }
}
</script>

<template>
  <el-container>
    <el-header>
      <h1 style="text-align: center">分解树插件示例</h1>
    </el-header>
    <el-main v-loading="loading" element-loading-text="异步加载数据示例...">

      <decomposition-tree :tree-data="treeData" @onItemClick="onDecompositionTreeClick" :bodyStyle="{border: '1px solid #eee'}">
        <template #header="slotProps">
          <div class="demo-header">
            <template v-for="(item, index) in slotProps.columnData" :key="index">
              <div class="demo-header-col" v-if="item.length" :style="{  marginLeft: index ? '84px' : 0 }" style="">
                第{{ index+1 }}列
              </div>
            </template>
          </div>
        </template>
        <template #item="{ item, col, index }">
          <div class="demo-item">{{ item.label || '节点'+item._uid }}</div>
        </template>
      </decomposition-tree>

    </el-main>
  </el-container>
</template>

<style scoped>
.demo-header{
  display: flex;
  margin-left: 20px
}
.demo-header-col{
  width: 200px;
  background-color: #eee;
  text-align: center;
  padding: 5px;
  border-radius: 4px 4px 0 0;
}
.demo-item{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
