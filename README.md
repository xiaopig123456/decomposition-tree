# decompositionTree

一个vue3分解树展示组件。

![decomposition tree preview](https://github.com/xiaopig123456/decomposition-tree/blob/main/src/assets/preview.jpg)

## 使用

```sh
npm install decomposition-tree --save
```

```vue3
<script setup lang="ts">
  import DecompositionTree from 'decomposition-tree';
  import 'decomposition-tree/lib/style.css';

  const treeData = [
    {id:'1', label:'节点1',children:[
        {id:'1-1',label:'节点1-1'},
        {id:'1-2',label:'节点1-2'},
      ]}
  ];
</script>
<template>
  <decomposition-tree :tree-data="treeData">
    <template #item="{ item, col, index }">
      {{ item.label}}
    </template>
  </decomposition-tree>
</template>
```

## 属性

| 名            | 描述                                   | 默认组                |
|--------------|--------------------------------------|--------------------|
| treeData   | 数据，格式`[{id:'',children:[]},]`        | `[]`               |
| height | 组件高度，需带单位，例如`400px`                  | `''`               |
| itemHeight | 项高度                                  | `46`                 |
| itemSpacing | 项下边距                                 | `16`                 |
| color | 选中颜色                                 | `rgb(224, 227, 235)` |
| activeColor | 未选中颜色                                |  `'rgb(138, 110, 250)'`|
| bodyStyle | 内容css样式，例如`{border:'1px solid red'}` | `{}`               |

## 事件

| 名       | 参数 | 描述 |
|---------|-----|-----|
| onItemClick | `item`：项数据 | 项被点击 |

## 插槽

| 名       | 属性 | 描述 |
|---------|-----|-----|
| default | - | 默认插槽 |
| item    | `item`：项数据、`col`：列索引、`index`：项索引 | 项插槽 |
| header  | `columnData`：列数据，`selectedItem`：选中项索引 | 头部插槽 |


## 接口

| 名            | 描述 |
|--------------|-----|
| columnData   | 列数据 |
| selectedItem | 选中项 |
