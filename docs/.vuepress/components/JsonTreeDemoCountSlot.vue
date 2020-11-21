<template>
  <el-card style="margin-top: 20px;">
    <JsonTree :json-data="jsonData" :expand-deep="1">
      <template #count="{ count, type }">
        //（值类型：{{ type }}，共 {{ count }} 项）
      </template>
    </JsonTree>
  </el-card>
</template>

<script>
import { jsonData } from '../mock/data'

export default {
  name: 'JsonTreeDemoCountSlot',
  data () {
    return {
      jsonData
    }
  }
}
</script>
