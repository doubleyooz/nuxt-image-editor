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

const props = defineProps(["contextRef", "canvasRef", "canvasId"]);
const { contextRef, canvasRef, canvasId } = toRefs(props);
let currIndex = ref<number>(0);

let computedPixels = computed(() => {
  if (!contextRef) return;
  if (!contextRef.value) return;

  return contextRef.value
    .getImageData(0, 0, 12, 12)
    .data.reduce((result: any, number: number, index: number) => {
      const groupIndex = Math.floor(index / 4); // Group size is 4 in this example
      if (!result[groupIndex]) {
        result[groupIndex] = {};
      }
      result[groupIndex][index % 4] = number;
      return result;
    }, []);
});

const onMouseOver = (index: number) => (currIndex.value = index);

const onMouseMove = (e: MouseEvent) => {
  if (!canvasRef) return;
 
  const { clientX, clientY } = e;
  
  let point = computePointInCanvas(
    canvasRef.value as HTMLCanvasElement,
    clientX,
    clientY
  );
  if (!point) return;
  console.log(point);
  console.log({
    ...contextRef!.value.getImageData(point.x, point.y, 1, 1).data,
  });
};
</script>
