export default {
  name: 'JsonTreeNode',
  props: {
    jsonData: {
      required: true
    },
    showLine: {
      type: Boolean,
      default: true
    },
    indent: {
      type: [String, Number],
      default: '20px'
    },
    jsonKey: {
      type: [String, Number]
    },
    // 当前节点的 key path
    jsonKeys: {
      type: Array,
      default: () => []
    },
    deep: {
      type: Number,
      default: 0
    },
    collapse: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      localCollapse: !!this.collapse
    }
  },
  computed: {
    nodePaddingLeft () {
      if (this.deep === 0) return '0'

      const { indent } = this
      if (typeof indent === 'string') return indent
      if (typeof indent === 'number') return `${indent}px`
      // 如果显示连接线, 则增大边距
      return this.showLine ? '20px' : '10px'
    },
    jsonDataType () {
      const { jsonData } = this
      if (Array.isArray(jsonData)) return 'array'
      // TODO: Set 和 Map 支持
      if (jsonData instanceof Map) return 'map'
      if (jsonData instanceof Set) return 'set'
      if (jsonData == null) return 'null'
      if (Object.prototype.toString.call(jsonData) === '[object Object]') {
        return 'object'
      }

      // string, number, undefined, function, date, symbol
      return (typeof jsonData)
    },
    // 是否应该隐藏 toggle
    shouldHideToggle () {
      const { jsonData, jsonDataType } = this
      // 如果是空数组, 则隐藏 toggle
      if (jsonDataType === 'array') return jsonData.length === 0
      // 如果是空对象, 则隐藏 toggle
      if (jsonDataType === 'object') return Object.keys(jsonData).length === 0

      // 以下几种特殊类型, 则隐藏 toggle
      return [
        'number',
        'string',
        'null',
        'undefined',
        'symbol',
        'map', // map 类型暂时不可展开
        'set' // set 类型暂时不可展开
      ].includes(jsonDataType)
    },
    // 是否显示 key
    showJsonKey () {
      const { jsonKey } = this
      return (typeof jsonKey === 'number') || jsonKey
    },
    // 仅用于 jsonData 不是 array 且不是 object 时
    // TODO: 暂未考虑 Set 和 Map 类型
    displayedJsonVal () {
      const { jsonData, jsonDataType } = this
      if (['array', 'object'].includes(jsonDataType)) return ''
      if (['undefined', 'null'].includes(jsonDataType)) return String(jsonData)
      if (jsonDataType === 'string') return `"${jsonData}"`
      return jsonData // data 为 number 类型
    },
    cntTip () {
      const { jsonData, jsonDataType } = this

      if (jsonDataType === 'array') {
        return `// ${jsonData.length} items`
      }

      if (jsonDataType === 'object') {
        return `// ${Object.keys(jsonData).length} keys`
      }

      return ''
    }
  },
  methods: {
    // 递归调用
    expandNode () {
      console.log('expandNode')
      const { jsonData, jsonDataType, asyncCall, $refs } = this
      if (this.shouldHideToggle) {
        this.localCollapse = true
      } else {
        this.localCollapse = false
      }

      if (jsonDataType === 'array') {
        jsonData.forEach((v, i) => {
          asyncCall(() => {
            try {
              $refs[`jsonTreeNode${i}`][0].expandNode()
            } catch (e) {}
          })
        })
      } else if (jsonDataType === 'object') {
        for (const k in jsonData) {
          asyncCall(() => {
            try {
              $refs[`jsonTreeNode${k}`][0].expandNode()
            } catch (e) {}
          })
        }
      } else {
        // 其他类型的值不会有展开的操作
      }
    },
    collapseNode () {
      console.log('collapseNode')
      const { jsonData, jsonDataType, asyncCall, $refs } = this
      this.localCollapse = true
      if (jsonDataType === 'array') {
        jsonData.forEach((v, i) => {
          asyncCall(() => {
            try {
              $refs[`jsonTreeNode${i}`][0].collapseNode()
            } catch (e) {}
          })
        })
      } else if (jsonDataType === 'object') {
        for (const k in jsonData) {
          asyncCall(() => {
            try {
              $refs[`jsonTreeNode${k}`][0].collapseNode()
            } catch (e) {}
          })
        }
      } else {
        // 其他类型的值不会有展开的操作
      }
    },
    onToggle () {
      if (this.shouldHideToggle) return
      this.localCollapse = !this.localCollapse

      if (this.localCollapse) {
        this.$emit('node-collapse', {})
      } else {
        this.$emit('node-expand', {})
      }
    },
    onNodeClick () {
      const { jsonKey, jsonKeys, jsonData } = this
      this.$emit('node-click', { jsonKey, jsonKeys, jsonData })
    },
    asyncCall (callback) {
      // if (typeof requestAnimationFrame === 'function') {
      //   requestAnimationFrame(callback)
      // } else {
      //   setTimeout(callback, 0)
      // }
      callback()
    }
  }
}
