import { Ref } from 'vue';
interface treeItem {
    id: string;
    children?: treeItem[];
    [propName: string]: any;
}
interface elStyle {
    [propName: string]: string | number;
}
export interface Props {
    treeData: treeItem[];
    height?: string;
    itemHeight?: number;
    itemSpacing?: number;
    color?: string;
    activeColor?: string;
    bodyStyle?: elStyle | string;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<Props, {
    selectedItem: Ref<number[], number[]>;
    columnData: Ref<treeItem[][], treeItem[][]>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    onItemClick: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onOnItemClick?: ((...args: any[]) => any) | undefined;
}>, {
    treeData: treeItem[];
    height: string;
    itemHeight: number;
    itemSpacing: number;
    color: string;
    activeColor: string;
    bodyStyle: string | elStyle;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    decompositionTreeRef: HTMLDivElement;
}, HTMLDivElement>, {
    header?(_: {
        selectedItem: number[];
        columnData: treeItem[][];
    }): any;
    item?(_: {
        item: treeItem;
        col: number;
        index: number;
    }): any;
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
