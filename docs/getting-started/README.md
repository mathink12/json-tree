# Getting started

1. 安装 Install
  ```bash
  npm i json-tree-pro
  ```

2. 使用 Usage
  ```js
  // main.js
  import Vue from 'vue'
  import JsonTree from 'json-tree-pro'
  import 'json-tree-pro/lib/JsonTree.css'

  Vue.component('JsonTree', JsonTree)
  ```

  ```vue
  <JsonTree :json-data="{ name: 'Tom', age: 7 }" />
  ```
