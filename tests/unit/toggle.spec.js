import { mount } from '@vue/test-utils'
import JsonTree from '@/index.js'

// 使用这个方法生成的 json 结构数据
// 根据 JsonTree 的默认项
// 将会全部展开(默认展开两级), 并显示 3 条连接线
const genJsonData = () => {
  return {
    name: 'Tom',
    age: 2,
    friends: [
      { name: 'Jerry' },
      { name: 'Tuffy' }
    ]
  }
}

const factory = (propsData) => {
  return mount(JsonTree, {
    propsData: {
      jsonData: genJsonData(),
      ...propsData
    }
  })
}

describe('JsonTree.vue toggle', () => {
  it('toggle 图标显示', () => {
    // 这里需要注意 jsonData 要使得生成的结果中既有 + 又有 -
    const wrapper = factory()

    const toggles = wrapper
      .findAll('.json-tree__toggle:not(.json-tree__toggle--hidden)')

    const iconCorrent = toggles.wrappers.every(v => {
      if (v.classes('json-tree__toggle--collapse')) {
        return v.text() === '+'
      }
      return v.text() === '-'
    })

    expect(iconCorrent).toBe(true)
  })

  it('toggle 切换交互', async () => {
    const wrapper = factory()
    // 只判定第一个即可
    const rootToggle = wrapper.find('.json-tree__toggle')
    if (rootToggle.classes('json-tree__toggle--collapse')) {
      // 当前节点是折叠起来的
      await rootToggle.trigger('click')
      expect(rootToggle.classes('json-tree__toggle--collapse')).toBe(false)
    } else {
      await rootToggle.trigger('click')
      expect(rootToggle.classes('json-tree__toggle--collapse')).toBe(true)
    }
  })
})
