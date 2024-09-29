<script setup lang="ts">
import DecompositionTree from '@/components/DecompositionTree.vue';
import { ref } from 'vue';

const treeData = ref([
  {
    id: '1', children: [
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
      { id: '1-2' },
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
      { id: '1-4' },
      { id: '1-5' },
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
  <el-container style="height: 100%;">
    <el-main v-loading="loading" element-loading-text="异步加载数据示例...">

      <decomposition-tree :tree-data="treeData" @onItemClick="onDecompositionTreeClick" style="height: 500px;">
        <template #header="slotProps">
          <div style="margin-bottom: 20px;display: flex;">
            <template v-for="(item, index) in slotProps.columnData" :key="index">
              <div v-if="index && item.length" :style="{ width: '200px', marginRight: index ? '84px' : 0 }" style="background-color: #eee;">
                第一{{ index }}列
              </div>
            </template>
          </div>
        </template>
        <template #item="{ item, col, index }">
          <div style="flex: 1;display: flex;align-items: center;justify-content: center;">我是{{ item._uid }}</div>
        </template>
      </decomposition-tree>

    </el-main>
  </el-container>
</template>
