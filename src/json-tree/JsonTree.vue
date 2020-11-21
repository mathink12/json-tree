<template>
  <div class="json-tree">
    <JsonTreeNode ref="jsonTreeNode"
      :json-data="jsonData"
      :show-line="showLine"
      :indent="indent"
      :expand-deep="expandDeep">
      <template v-for="(_, slot) of $scopedSlots"
        v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope"></slot>
      </template>
    </JsonTreeNode>
  </div>
</template>

<script>
import JsonTreeNode from './JsonTreeNode'

export default {
  name: 'JsonTree',
  components: {
    JsonTreeNode
  },
  props: {
    jsonData: {
      required: true
    },
    // 是否显示树图的辅助连接线
    showLine: {
      type: Boolean,
      default: true
    },
    // 每一层级的缩进
    // 如果类型是 string(如 '20px'), 则将左边距设置为 20px
    // 如果类型是 number(如 10), 则将左边距设置为 10px
    indent: {
      type: [String, Number],
      default: '20px'
    },
    // 默认展开的层级
    expandDeep: {
      type: Number,
      default: 2
    }
  },
  methods: {
    expandAll () {
      this.$refs.jsonTreeNode.expandNode()
    },
    collapseAll () {
      this.$refs.jsonTreeNode.collapseNode()
    }
  }
}
</script>

<style lang="scss" src="./json-tree.scss"></style>
