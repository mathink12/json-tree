<template>
  <el-card style="margin-top: 20px;">
    <JsonTree :json-data="jsonData" :expand-deep="1">
      <template #toggle="{ collapse }">
        <i :class="collapse ? 'el-icon-caret-right' : 'el-icon-caret-bottom'"></i>
      </template>
    </JsonTree>
  </el-card>
</template>

<script>
import { jsonData } from '../mock/data'

export default {
  name: 'JsonTreeDemoToggleSlot',
  data () {
    return {
      jsonData
    }
  }
}
</script>
