<template>
  <div class="json-tree-demo">
    <el-card>
      <el-form label-width="180px" label-position="left">
        <el-form-item label="连接线（Connector Line）">
          <el-switch v-model="showLine" />
        </el-form-item>
        <el-form-item label="图标风格（Toggle Icon）">
          <el-radio-group v-model="toggle" size="small">
            <el-radio-button label="default">默认风格</el-radio-button>
            <el-radio-button label="caret">自定义风格 1</el-radio-button>
            <el-radio-button label="arrow">自定义风格 2</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="层级缩进（Deep Indent）">
          <el-radio-group v-model="indent" size="small">
            <el-radio-button
              v-for="(item, i) in indents"
              :key="i"
              :label="item">
              {{ item }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="展开层级（Expand Deep）">
          <el-input-number v-model="deep" :min="0" size="small" />
        </el-form-item>
      </el-form>

    </el-card>

    <div style="margin: 20px 0;">
      <el-button size="small" @click="onExpandAll">
        全部展开（Expand All）
      </el-button>
      <el-button size="small" @click="onCollapseAll">
        全部收起（Collapse All）
      </el-button>
    </div>

    <JsonTree v-if="showJsonTree"
      ref="jsonTree"
      :json-data="jsonData"
      :show-line="showLine"
      :indent="indent"
      :expand-deep="deep"
    />
  </div>
</template>

<script>
import { jsonData } from '../mock/data'

export default {
  name: 'JsonTreeDemo',
  data () {
    return {
      showJsonTree: true,
      showLine: true,
      indent: '20px',
      deep: 2,
      indents: ['5px', '10px', '20px', '30px', '40px', '50px'],
      toggle: 'default',
      jsonData
    }
  },
  watch: {
    deep () {
      this.showJsonTree = false
      this.$nextTick(() => {
        this.showJsonTree = true
      })
    }
  },
  methods: {
    onExpandAll () {
      this.$refs.jsonTree.expandAll()
    },
    onCollapseAll () {
      this.$refs.jsonTree.collapseAll()
    },
    calcToggleClass (collapse) {
      let className = ''
      const { toggle } = this
      if (toggle === 'caret') {
        if (collapse) {
          className = 'el-icon-caret-right'
        } else {
          className = 'el-icon-caret-bottom'
        }
      } else if (toggle === 'arrow') {
        if (collapse) {
          className = 'el-icon-arrow-right'
        } else {
          className = 'el-icon-arrow-down'
        }
      }
      return className
    }
  }
}
</script>
