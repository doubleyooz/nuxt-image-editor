<template>
  <div class="flex pt-[50px] pl-[50px] items-center">
    <Canvas
      :onMouseOver="onMouseOver"
      :computedPixels="computedPixels"
      :currIndex="currIndex"
      :onMouseMove="onMouseMove"
      canvasId="originalCanvas"
    />

    <button class="bg-red-400 text-white hover:bg-red-500 hover:border px-2 h-8 rounded" @click="grayFilter(contextRef)">GRAY FILTER</button>
    <Canvas
      :onMouseOver="onMouseOver"
      :computedPixels="computedPixels"
      :currIndex="currIndex"
      :onMouseMove="onMouseMove"
      canvasId="updatedCanvas"
    />
  
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import Canvas from "~/components/Canvas.vue";
import { grayFilter } from "~/utils/filter";

const userStore = useUserStore();
const contextRef = ref<CanvasRenderingContext2D | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const updatedCanvas = ref<HTMLCanvasElement | null>(null);

console.log(userStore.images);
let currIndex = ref<number>(0);

let computedPixels = computed(() => {
  if (!contextRef.value) return;
  console.log(typeof contextRef, contextRef)

  console.log("canvas test", contextRef.value.getImageData(0, 0, 20, 20));
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
/*
watch(computedPixels, (newValue, updatedValue) => {
  console.log("newValue", newValue);
  console.log("updatedValue", updatedValue);
});
*/
onMounted(() => {
  const image = new Image();
  //console.log("contextRef", contextRef.value);

  image.src = "_nuxt/assets/temp.jpg";

  image.onload = () => {
    canvasRef.value = document.getElementById(
      "originalCanvas"
    ) as HTMLCanvasElement;
    if (!canvasRef.value) return;
    contextRef.value = canvasRef.value.getContext("2d");

    canvasRef.value!.width = image.width < 300 ? image.width : 300;
    canvasRef.value!.height = image.height < 300 ? image.height : 300;
    //updatedCanvas.value.width = canvasRef.value!.width;
    //updatedCanvas.value.height


    contextRef.value!.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,

      0,
      0,
      canvasRef.value!.width,
      canvasRef.value!.height
    );
    console.log(contextRef.value);
    //originalArray.value = ctx.getImageData(0, 0, 300, 300);
    //console.log(originalArray.value);
  };
});

const onMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e;
  let point = computePointInCanvas(
    canvasRef.value as HTMLCanvasElement,
    clientX,
    clientY
  );
  if (!point) return;
  console.log(point);
  console.log({
    ...contextRef.value!.getImageData(point.x, point.y, 1, 1).data,
  });
};

const onMouseOver = (index: number) => {
  console.log(computedPixels.value[currIndex.value]);
  currIndex.value = index;
};
</script>
