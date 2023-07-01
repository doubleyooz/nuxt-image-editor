<template>
  <div class="flex flex-col justify-center gap-[20px]">
    <canvas
      :id="canvasId"
      class="border border-red-800"
      @mousemove="onMouseMove"
    >
    </canvas>
    <div v-if="computedPixels" class="w-full text-center">
      <span>{{ computedPixels[currIndex] }}</span>
      <div class="flex flex-wrap w-[320px] justify-center">
        <div
          class="w-[20px] h-[20px] border border-gray-900"
          :class="[
            `${index === currIndex ? 'bg-blue-800' : ''}`,
            `bg-[${rgbToHex(item['0'], item['1'], item['2'])}]`,
          ]"
          v-for="(item, index) in computedPixels"
          :key="index"
          @mouseover="onMouseOver(index)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { rgbToHex } from "~/utils/element";
const props = defineProps([
  "onMouseMove",
  "onMouseOver",
  "computedPixels",
  "currIndex",
  "canvasId",
]);
const { onMouseMove, onMouseOver, computedPixels, canvasId, currIndex } =
  toRefs(props);
</script>
