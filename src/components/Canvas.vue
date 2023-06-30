<template>
  
    <div class="flex flex-col justify-center gap-[20px]">
      <canvas
        id="originalCanvas"
        class="border border-blue-800"
        @mousemove="onMouseMove"
      >
      </canvas>
      <div v-if="computedPixels">
        <div>{{ computedPixels[currIndex] }}</div>
        <div class="flex flex-wrap w-[320px] justify-center">
          <div
            class="w-[20px] h-[20px] border border-gray-900"
            :class="`${index === currIndex ? 'bg-blue-800' : ''} `"
            v-for="(item, index) in computedPixels"
            :key="index"
            @mouseover="onMouseOver(index)"
          ></div>
        </div>
      </div>
    </div>
 
</template>

<script setup lang="ts">
const props = defineProps([
  "onMouseMove",
  "onMouseOver",
  "computedPixels",
  "currIndex",
]);
const { onMouseMove, onMouseOver, computedPixels, currIndex } = toRefs(props);
</script>
