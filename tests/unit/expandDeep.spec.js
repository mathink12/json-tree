// Prop: expandDeep(自动展开的层级)
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

describe('JsonTree.vue props:expandDeep', () => {
  it('默认情况下展开 2 层', () => {
    const wrapper = factory()

    const deep3IsCollapsed = wrapper
      .findAll('[data-json-tree-node-deep="2"] .json-tree__content')
      .wrappers
      .every(v => v.classes().includes('json-tree__content--collapse'))

    expect(deep3IsCollapsed).toBe(true)
  })

  it('展开 1 层', () => {
    const wrapper = factory({ expandDeep: 1 })

    const deep2IsCollapsed = wrapper
      .findAll('[data-json-tree-node-deep="1"] .json-tree__content')
      .wrappers
      .every(v => v.classes().includes('json-tree__content--collapse'))

    expect(deep2IsCollapsed).toBe(true)
  })
})
