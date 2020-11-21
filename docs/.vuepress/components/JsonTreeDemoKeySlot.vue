<template>
  <el-card style="margin-top: 20px;">
    <JsonTree :json-data="jsonData" :expand-deep="1">
      <template #key="{ itemKey }">
        <span style="color: #f00;">{{ itemKey }}</span>
      </template>
    </JsonTree>
  </el-card>
</template>

<script>
import { jsonData } from '../mock/data'

export default {
  name: 'JsonTreeDemoKeySlot',
  data () {
    return {
      jsonData
    }
  }
}
</script>
