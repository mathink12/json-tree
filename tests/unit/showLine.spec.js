// Prop: showLine(是否显示连接线)
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
    friends: ['Jerry', 'Tuffy', 'Spike', 'Tyke']
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

// 只要值类型是 object 或 array 就会生成连接线
// 连接线是否显示是通过 'display: none' 来控制的
describe('JsonTree.vue props:showLine', () => {
  it('默认情况下显示的连接线个数正确', () => {
    const wrapper = factory()

    // 根据 json 数据的结构, 会生成相应个数的连接线
    // 默认情况下显示连接线
    expect(wrapper.findAll('.json-tree__connector-line').length).toBe(3)
  })

  it('通过 showLine prop 控制连接线的显示', async () => {
    const wrapper = factory({ showLine: false })

    expect(wrapper.findAll('.json-tree__connector-line').length).toBe(0)

    await wrapper.setProps({ showLine: true })
    expect(wrapper.findAll('.json-tree__connector-line').length).toBe(3)
  })

  // TODO: 连接线的可见性
})
