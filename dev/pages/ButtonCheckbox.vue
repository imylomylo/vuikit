<template>
  <div>
    <vk-button-checkbox
      :value="demo1.value"
      @change="value => {
        demo1.value = value
      }">
      <vk-button :value="1">Button 1</vk-button>
      <vk-button :value="2">Button 2</vk-button>
      <vk-button :value="3">Button 3</vk-button>
    </vk-button-checkbox>
  </div>
</template>

<script>
export default {
  data: () => ({
    demo1: {
      value: [1]
    }
  })
}
</script>
