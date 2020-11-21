# API

## Props
|    Name    |        Type        |                Description                |
|------------|--------------------|-------------------------------------------|
| jsonData   | `Array` / `Object` | 要显示的 json 数据                        |
| showLine   | `Boolean`          | 是否显示辅助连接线，默认为 `true`（显示） |
| indent     | `String`           | 层级缩进值，默认为 `'20px'`               |
| expandDeep | `Number`           | 自动展开的层级，默认为 `2`                |

可前往 [Playground](/) 查看效果


## Slots
|  Name  |                          Slot props                         |                                                            Description                                                             |
|--------|-------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| toggle | <code style="white-space: nowrap;">{ collapse }</code>      | 展开、收起的图标，展开时，`collapse` 为 `false`，收起时为 `true`                                                                   |
| count  | <code style="white-space: nowrap;">{ count, type }</code>   | 显示在数组或对象类型的值后面表示其有多少项的说明，`count` 表示数组长度或对象的键值对个数，`type` 表示值类型（'array' 或 'object'） |
| key    | <code style="white-space: nowrap;">{ itemKey }</code>       | 显示的 key。如果是对象，则是对象的 `key`；如果是数组，则是数组项的索引。                                                           |
| val    | <code style="white-space: nowrap;">{ itemVal, type }</code> | 显示的 value。对象的 value 或者数组的项。                                                                                          |


#### 自定义 `toggle`（使用 Element UI 的图标）

<JsonTreeDemoToggleSlot />

::: details 自定义 `toggle`（使用 Element UI 的图标）
```vue
<JsonTree :json-data="jsonData" :expand-deep="1">
  <template #toggle="{ collapse }">
    <i :class="collapse ? 'el-icon-caret-right' : 'el-icon-caret-bottom'"></i>
  </template>
</JsonTree>
```
:::

#### 自定义 `count`

<JsonTreeDemoCountSlot />

::: details 自定义 `count`
```vue
<JsonTree :json-data="jsonData" :expand-deep="1">
  <template #count="{ count, type }">
    //（值类型：{{ type }}，共 {{ count }} 项）
  </template>
</JsonTree>
```
:::

#### 自定义 `key`

<JsonTreeDemoKeySlot />

::: details 自定义 `key`
```vue
<JsonTree :json-data="jsonData" :expand-deep="1">
  <template #key="{ itemKey }">
    <span style="color: #f00;">{{ itemKey }}</span>
  </template>
</JsonTree>
```
:::

#### 自定义 `val`

<JsonTreeDemoValSlot />

::: details 自定义 `val`
```vue
<JsonTree :json-data="jsonData" :expand-deep="1">
  <template #val="{ itemVal, type }">
    <span style="color: #f00;">{{ itemVal }}（{{ type }}）</span>
  </template>
</JsonTree>
```
:::

## Events
暂无


## Methods

|     Name    | Params | Description |
|-------------|--------|-------------|
| expandAll   | --     | 全部展开    |
| collapseAll | --     | 全部收起    |
