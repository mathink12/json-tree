// Prop: indent(层级缩进)
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

describe('JsonTree.vue props:indent', () => {
  it('默认情况下缩进为 20px', () => {
    const wrapper = factory()

    const is20px = wrapper
      .findAll('.json-tree__node')
      .wrappers
      .every(v => {
        const deep = v.attributes('data-json-tree-node-deep')
        const paddingLeft = v.element.style.getPropertyValue('padding-left')
        // 第一层没有缩进
        if (deep === '0') return paddingLeft === '0px'
        // 其他层级都缩进 '20px'
        return paddingLeft === '20px'
      })

    expect(is20px).toBe(true)
  })

  it('设置缩进为 30px', () => {
    const wrapper = factory({ indent: '30px' })

    const is30px = wrapper
      .findAll('.json-tree__node')
      .wrappers
      .every(v => {
        const deep = v.attributes('data-json-tree-node-deep')
        const paddingLeft = v.element.style.getPropertyValue('padding-left')
        // 第一层没有缩进
        if (deep === '0') return paddingLeft === '0px'
        // 其他层级都缩进 '20px'
        return paddingLeft === '30px'
      })

    expect(is30px).toBe(true)
  })
})
