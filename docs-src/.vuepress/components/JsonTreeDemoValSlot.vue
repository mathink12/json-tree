<template>
  <el-card style="margin-top: 20px;">
    <JsonTree :json-data="jsonData" :expand-deep="1">
      <template #val="{ itemVal, type }">
        <span style="color: #f00;">{{ itemVal }}（{{ type }}）</span>
      </template>
    </JsonTree>
  </el-card>
</template>

<script>
import { jsonData } from '../mock/data'

export default {
  name: 'JsonTreeDemoValSlot',
  data () {
    return {
      jsonData
    }
  }
}
</script>
