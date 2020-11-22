<template>
  <div class="json-tree__node"
    :data-json-tree-node-deep="deep"
    :style="{ paddingLeft: nodePaddingLeft }">
    <!-- 展开和收起两种状态 -->
    <span
      :class="{
        'cursor-pointer': true,
        'json-tree__toggle': true,
        'json-tree__toggle--hidden': shouldHideToggle
      }"
      @click.stop="onToggle">
      <slot name="toggle" v-bind:collapse="localCollapse">
        <i v-text="localCollapse ? '+' : '-'"></i>
      </slot>
    </span>
    <div :class="{
      'json-tree__content': true,
      'json-tree__content--collapse': localCollapse
    }" @click.stop="onNodeClick">
      <div class="json-tree__content__header">
        <!-- jsonKey: -->
        <span v-if="showJsonKey">
          <span :class="[
            'json-tree__key',
            `json-tree__key--${typeof jsonKey}`
          ]">
            <slot name="key" v-bind:item-key="jsonKey">{{ jsonKey }}</slot>
          </span>
          <span class="json-tree__colon">:</span>
        </span>

        <!-- json value collapsed -->
        <template v-if="localCollapse">

          <!-- collapse: array -->
          <template v-if="jsonDataType === 'array'">
            <span v-text="shouldHideToggle ? '[]' : '[...]'"
              class="json-tree__bracket json-tree__bracket--collapse"
              :class="shouldHideToggle ? '' : 'cursor-pointer'"
              @click.stop="onToggle">
            </span>
            <span class="json-tree__cnt-tips">
              <slot name="count"
                v-bind:count="childCnt"
                v-bind:type="jsonDataType"
                v-text="cntTip">
              </slot>
            </span>
          </template>

          <!-- collapse: object -->
          <template v-else-if="jsonDataType === 'object'">
            <span v-text="shouldHideToggle ? '{}' : '{...}'"
              class="json-tree__brace json-tree__brace--collapse"
              :class="shouldHideToggle ? '' : 'cursor-pointer'"
              @click.stop="onToggle">
            </span>
            <span class="json-tree__cnt-tips">
              <slot name="count"
                v-bind:count="childCnt"
                v-bind:type="jsonDataType"
                v-text="cntTip">
              </slot>
            </span>
          </template>

          <!-- collapse: string / number -->
          <span v-else
            :class="[
              'json-tree__val',
              `json-tree__val--${jsonDataType}`
            ]">
            <slot name="val"
              v-bind:item-val="jsonData"
              v-bind:type="jsonDataType">{{ displayedJsonVal }}</slot>
          </span>
        </template>

        <!-- json value expanded -->
        <template v-else>

          <!-- expand: array -->
          <span v-if="jsonDataType === 'array'">
            <span class="json-tree__bracket--left">[</span>
            <span class="json-tree__cnt-tips">
              <slot name="count"
                v-bind:count="childCnt"
                v-bind:type="jsonDataType"
                v-text="cntTip">
              </slot>
            </span>
          </span>

          <!-- expand: object -->
          <span v-else-if="jsonDataType === 'object'">
            <span v-text="'{'" class="json-tree__brace--left"></span>
            <span class="json-tree__cnt-tips">
              <slot name="count"
                v-bind:count="childCnt"
                v-bind:type="jsonDataType"
                v-text="cntTip">
              </slot>
            </span>
          </span>

          <!-- expand: string / number -->
          <span v-else
            :class="[
              'json-tree__val',
              `json-tree__val--${jsonDataType}`
            ]">
            <slot name="val"
              v-bind:item-val="jsonData"
              v-bind:type="jsonDataType">{{ displayedJsonVal }}</slot>
          </span>
        </template>
      </div>
      <template v-if="['array', 'object'].includes(jsonDataType)">
        <JsonTreeNode
          v-for="(childData, i) in jsonData"
          :key="`${deep}-${i}`"
          :ref="`jsonTreeNode${i}`"
          :json-key="i"
          :json-keys="[...jsonKeys, i]"
          :json-data="childData"
          :indent="indent"
          :expand-deep="expandDeep"
          :deep="deep + 1"
          :show-line="showLine">
          <template v-for="(_, slot) of $scopedSlots"
            v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </JsonTreeNode>
      </template>

      <!--
        当且仅当值类型是 array 或 object 且是展开的时候
        显示一个收尾的符号: ] 或 }
      -->
      <div v-if="!localCollapse && ['array', 'object'].includes(jsonDataType)"
        class="json-tree__content__footer">
        <span v-if="jsonDataType === 'array'"
          v-text="']'"
          class="json-tree__bracket--right">
        </span>
        <span v-else-if="jsonDataType === 'object'"
          v-text="'}'"
          class="json-tree__brace--right">
        </span>
      </div>

      <!-- 层级的连接线 -->
      <div v-if="showLine && !shouldHideToggle"
        class="json-tree__connector-line"></div>
    </div>
  </div>
</template>

<script src="./json-tree-node.js"></script>
