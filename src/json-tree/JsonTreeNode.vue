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
        <span v-if="showJsonKey">
          <span v-text="jsonKey" :class="[
            'json-tree__key',
            `json-tree__key--${typeof jsonKey}`
          ]"></span>
          <span class="json-tree__colon">:</span>
        </span>
        <template v-if="localCollapse">
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
          <span v-else v-text="displayedJsonVal"
            :class="[
              'json-tree__val',
              `json-tree__val--${jsonDataType}`
            ]">
          </span>
        </template>
        <template v-else>
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
          <span v-else v-text="displayedJsonVal"
            :class="[
              'json-tree__val',
              `json-tree__val--${jsonDataType}`
            ]">
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
          :deep="deep + 1"
          :show-line="showLine">
          <template v-for="(_, slot) of $scopedSlots"
            v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </JsonTreeNode>
      </template>
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
      <div v-if="showLine" class="json-tree__connector-line"></div>
    </div>
  </div>
</template>

<script src="./json-tree-node.js"></script>
