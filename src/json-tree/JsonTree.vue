<template>
  <div class="json-tree">
    <JsonTreeNode ref="jsonTreeNode"
      :json-data="jsonData"
      :show-line="showLine"
      :indent="indent"
    />
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
    }
  },
  methods: {
    expandAll () {
      console.time()
      this.$refs.jsonTreeNode.expandNode()
      console.timeEnd()
    },
    collapseAll () {
      console.time()
      this.$refs.jsonTreeNode.collapseNode()
      console.timeEnd()
    },
    // TODO
    filter (text) {},
    // TODO: 查找指定项, 从 key 或 value 中查找
    // config: {
    //  origin: 'key' // key(仅在 key 中查找), value(仅在 value 中查找), both(在所有中查找)
    // }
    find (keyword, config) {},
    // TODO: 根据访问路径展开指定项
    expand (paths) {}
  }
}
</script>
