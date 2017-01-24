<template>
  <div class="uk-grid" :class="{
    'uk-flex uk-flex-row-reverse': flip
  }">
    <div :class="`uk-width-medium-${width}`">
      <ul class="uk-tab" :class="[flip
        ? 'uk-tab-right'
        : 'uk-tab-left'
      ]">
        <slot />
      </ul>
    </div>
    <div :class="`uk-width-medium-${contentWidth}`">
      <transition :name="transition" mode="out-in">
        <div :key="activeTab">
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import core from './core'
import tabcontent from './tabcontent'

export default {
  name: 'VkTabsVertical',
  extends: core,
  components: {
    tabcontent
  },
  props: {
    // tabs width using UIkit grid
    width: {
      type: String,
      default: ''
    },
    contentWidth: {
      type: String,
      default: '2-3'
    }
  }
}
</script>
