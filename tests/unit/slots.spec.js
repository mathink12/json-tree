// 插槽测试
import { mount } from '@vue/test-utils'
import JsonTree from '@/index.js'

// 使用这个方法生成的 json 结构数据
// 根据 JsonTree 的默认项
// 将会全部展开(默认展开两级), 并显示 3 条连接线
const genJsonData = () => {
  return {
    name: 'Tom',
    age: 2,
    nums: [1, 1, 2, 3, 5, 8],
    friends: [
      { name: 'Jerry', age: 1 },
      { name: 'Tuffy', age: 2 }
    ]
  }
}

const factory = (conf) => {
  return mount(JsonTree, {
    propsData: {
      jsonData: genJsonData(),
      expandDeep: 2
    },
    ...conf
  })
}

describe('JsonTree slots 测试', () => {
  // TODO: 测试 scoped slots
  it('toggle slot', () => {
    const wrapper = factory({
      scopedSlots: {
        toggle ({ collapse }) {
          return this.$createElement('i', {
            'class': collapse ? 'el-icon-caret-right' : 'el-icon-caret-bottom'
          })
        }
      }
    })

    // 根据 genJsonData() 生成的数据
    const toggles = wrapper.findAll('.json-tree__toggle:not(.json-tree__toggle--hidden)')
    // console.log(toggles.length)
    let expandedCnt = 0
    let collapsedCnt = 0
    toggles.wrappers.forEach(v => {
      // console.log(v.html())
      if (v.find('.el-icon-caret-bottom').exists()) {
        expandedCnt++
      } else if (v.find('.el-icon-caret-right').exists()) {
        collapsedCnt++
      }
    })
    // console.log(expandedCnt, collapsedCnt)
    // 应该有 3 个可见的收起图标(.el-icon-caret-bottom), 2 个可见的展开图标(.el-icon-caret-right)
    // const expandedIcons = toggles.filter(v => v.classes('el-icon-caret-bottom'))
    // const collapsedIcons = toggles.filter(v => v.classes('el-icon-caret-right'))
    // console.log(expandedIcons.length, collapsedIcons.length)

    // 应该有 3 个可见的收起图标(.el-icon-caret-bottom)
    // 2 个可见的展开图标(.el-icon-caret-right)
    // 注意：以上结果依赖于 expandDeep 和 genJsonData()
    expect(expandedCnt).toBe(3)
    expect(collapsedCnt).toBe(2)
  })

  it('count slot', () => {
    const wrapper = factory({
      scopedSlots: {
        count ({ type, count }) {
          return this.$createElement('span', {
            'class': 'slot-count'
          }, `// 值类型：${type}，共${count}项`)
        }
      }
    })

    expect(wrapper.find('.slot-count').exists()).toBe(true)

    const texts = wrapper.findAll('.slot-count').wrappers.map(v => v.text())
    expect(texts).toContain('// 值类型：object，共4项')
  })

  it('key slot', () => {
    const wrapper = factory({
      scopedSlots: {
        key ({ itemKey }) {
          return this.$createElement('span', { class: 'slot-key' }, itemKey)
        }
      }
    })

    expect(wrapper.find('.slot-key').exists()).toBe(true)

    const texts = wrapper.findAll('.slot-key').wrappers.map(v => v.text())
    expect(texts).toContain('name')
    expect(texts).toContain('age')
    expect(texts).toContain('nums')
    expect(texts).toContain('friends')
  })

  it('val slot', () => {
    const wrapper = factory({
      scopedSlots: {
        val ({ itemVal, type }) {
          return this.$createElement('span', {
            class: 'slot-val'
          }, `${itemVal}（${type}）`)
        }
      }
    })

    expect(wrapper.find('.slot-val').exists()).toBe(true)
    const texts = wrapper.findAll('.slot-val').wrappers.map(v => v.text())
    expect(texts).toContain('Tom（string）')
    expect(texts).toContain('2（number）')
  })
})
