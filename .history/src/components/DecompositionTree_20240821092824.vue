<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect, computed, nextTick } from 'vue';
import type { Ref } from 'vue'
// @ts-ignore
import LeaderLine from 'leader-line-vue';
import { excludeKeys } from 'filter-obj';

const emit = defineEmits(['onItemClick']);

interface treeItem {
    id: string
    children?: treeItem[],
    [propName: string]: any
}

export interface Props {
    treeData: treeItem[],
    itemHeight?: number,
    itemSpacing?: number
}

const props = withDefaults(defineProps<Props>(), {
    treeData: () => [],
    itemHeight: 46,
    itemSpacing: 16,
})

const selectedItem: Ref<number[]> = ref([]);
const hideChildrenIndex: Ref<number | null> = ref(null);
const columnData: Ref<treeItem[][]> = ref([]);
const columnCount = computed(() => {
    return selectedItem.value.length + 1;
})
const columnCntOffset: Ref<number[]> = ref([]);
const decompositionTreeRef: Ref<any> = ref(null);
const itemLineMap = new Map();

onMounted(() => {
    watchEffect(() => {
        clearLine();

        const _columnData: any[] = [];
        let tempTreeData: any[] = [...props.treeData];
        (new Array(columnCount.value)).fill([]).forEach((column, ci: number) => {
            _columnData.push([]);
            tempTreeData.forEach((item, index) => {
                _columnData[ci].push({ ...excludeKeys(item, ['children']), _uid: 'item-' + ci + '-' + index, _col: ci, _index: index, _active: selectedItem.value?.[ci] === index })
            })

            if (hideChildrenIndex.value !== null && ci >= hideChildrenIndex.value) {
                tempTreeData = [];
                return;
            }
            tempTreeData = typeof selectedItem.value[ci] !== 'undefined' ? [...tempTreeData?.[selectedItem.value[ci]]?.children || []] : [];
        })
        columnData.value = _columnData;

        nextTick(function () {
            // 显示位置
            const viewHeight = decompositionTreeRef.value.offsetHeight;
            const _columnCntOffset: number[] = [];
            columnData.value.forEach((column, ci) => {
                let colHeight = 0;
                for (let i = 0; i < column.length; i++) {
                    colHeight += props.itemHeight + (i ? props.itemSpacing : 0);
                    if (colHeight > viewHeight) break;
                }
                if (!colHeight || colHeight >= viewHeight) {
                    _columnCntOffset.push(0);
                    return;
                }
                let activeCenterTop: number = 0;
                if (!ci) {
                    activeCenterTop = viewHeight / 2;
                } else {
                    const activeIndex = selectedItem.value[ci - 1];
                    for (let i = 0; i <= activeIndex; i++) {
                        activeCenterTop += props.itemHeight + (i ? props.itemSpacing : 0);
                    }
                    activeCenterTop += _columnCntOffset[ci - 1] - props.itemHeight / 2;
                }
                let offset = 0;
                let activeArea = 0;
                if (activeCenterTop <= viewHeight / 2) {
                    activeArea = activeCenterTop * 2;
                    if (activeArea > colHeight) {
                        offset = (activeArea - colHeight) / 2; //  - props.itemSpacing
                    } else {
                        offset = 0;
                    }
                } else {
                    activeArea = (viewHeight - activeCenterTop) * 2;
                    if (activeArea > colHeight) {
                        offset = viewHeight - activeArea + (activeArea - colHeight) / 2;
                    } else {
                        offset = viewHeight - colHeight
                    }
                }
                _columnCntOffset.push(offset);
            })
            columnCntOffset.value = _columnCntOffset;

            // 划线
            nextTick(() => {
                const itemElList = decompositionTreeRef.value.getElementsByClassName('decomposition-tree-item');
                for (let index = 0; index < itemElList.length; index++) {
                    itemLineMap.set(itemElList[index].getAttribute('data-uid'), {
                        el: itemElList[index],
                        lineObj: null
                    })
                }
                columnData.value.forEach((column, ci) => {
                    if (!ci || !column.length) return;
                    const parentItem = columnData.value[ci - 1][selectedItem.value[ci - 1]];

                    column.forEach((item, index) => {
                        const lineObj = LeaderLine.setLine(itemLineMap.get(parentItem._uid).el, itemLineMap.get(item._uid).el, {
                            color: item._active ? 'rgb(138, 110, 250)' : 'rgb(224, 227, 235)',
                            size: 0.5,
                            endPlug: 'disc'
                        });
                        itemLineMap.set(item._uid, {
                            el: itemLineMap.get(item._uid).el,
                            lineObj: lineObj
                        });
                    })
                })
            })
        })
    })
})

function clearLine() {
    itemLineMap.forEach((value: any) => {
        if (!value.lineObj) return;
        value.lineObj.remove();
    })
    itemLineMap.clear();
}

let timer: number | null = null;
onMounted(function () {
    // 更新line
    decompositionTreeRef.value.addEventListener('scroll', function () {
        if (timer !== null) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            itemLineMap.forEach(value => {
                if (value.lineObj) value.lineObj.position();
            })
        }, 10)
    })
})

onUnmounted(() => {
    if (timer !== null) clearTimeout(timer);
    clearLine();
    if (decompositionTreeRef.value) decompositionTreeRef.value.removeEventListener('scroll')
})

function onItemClick(item: treeItem, gi: number, index: number) {
    if (hideChildrenIndex.value !== gi) hideChildrenIndex.value = null;
    if (typeof selectedItem.value[gi] === 'undefined') {
        selectedItem.value.push(index);
    } else {
        selectedItem.value[gi] = index;
        selectedItem.value.splice(gi + 1);
    }
    emit('onItemClick', item);
}

function onItemHandleClick(item: treeItem, gi: number, index: number) {
    hideChildrenIndex.value = hideChildrenIndex.value !== gi ? gi : null;
}

// 暴露数据
defineExpose({
    selectedItem,
    columnData,
})
</script>

<template>
    <div class="decomposition-tree">
        <div class="decomposition-tree-header">
            <slot name="header" :selectedItem="selectedItem" :columnData="columnData"> </slot>
        </div>
        <div class="decomposition-tree-body" ref="decompositionTreeRef">
            <template v-for="(group, gi) in columnData" :key="gi">
                <div v-if="group?.length" class="decomposition-tree-column" :style="{ paddingTop: `${columnCntOffset[gi]}px` }">
                    <div
                         v-for="(item, index) in group"
                         :key="index"
                         class="decomposition-tree-item"
                         :class="{ active: item._active }"
                         :data-uid="item._uid"
                         :data-col="gi"
                         :data-index="index"
                         :style="{ height: `${itemHeight}px`, marginBottom: `${itemSpacing}px` }">
                        <div class="decomposition-tree-item-cnt" @click="onItemClick(item, gi, index)">
                            <slot name="item" :item="item" :col="gi" :index="index">{{ item.id }}</slot>
                        </div>
                        <div class="decomposition-tree-item-handle" :class="selectedItem[gi] === index && hideChildrenIndex !== gi ? 'expand' : ''" @click="onItemHandleClick(item, gi, index)">
                            {{ !item._active || selectedItem[gi] === index && hideChildrenIndex !== gi ? '' : '+' }}
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss">
$color-primary: rgb(138, 110, 250);

.decomposition-tree {
    display: flex;
    flex-direction: column;

    * {
        box-sizing: border-box;
    }
}

.decomposition-tree-header {
    display: flex;
    align-items: center;
    padding-left: 284px;
}

.decomposition-tree-body {
    display: flex;
    flex: 1;
    overflow: auto;
}

.decomposition-tree-column {
    margin-left: 84px;

    &:first-child {
        margin-left: 0;
    }
}

.decomposition-tree-item {
    margin-bottom: 16px;
    position: relative;
    user-select: none;

    &.active {
        .decomposition-tree-item-cnt {
            border-color: $color-primary;
        }

        .decomposition-tree-item-handle {
            transform: translateY(-50%) scale(1);
        }
    }

    &:last-child {
        margin-bottom: 0 !important;
    }
}

.decomposition-tree-item-cnt {
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 46px;
    border-radius: 23px;
    border: 1px solid rgb(224, 227, 235);
    background-color: #fff;
    cursor: pointer;
    transition: background-color .15s;

    &:hover {
        background-color: rgba(0, 0, 0, .02);
    }
}

.decomposition-tree-item-handle {
    position: absolute;
    right: -6px;
    top: 50%;
    border-radius: 50%;
    height: 12px;
    transform: translateY(-50%) scale(0.5);
    width: 12px;
    z-index: 11;
    background-color: $color-primary;
    transition: transform .15s;
    font-size: 10px;
    line-height: 12px;
    text-align: center;
    color: #fff;
}
</style>