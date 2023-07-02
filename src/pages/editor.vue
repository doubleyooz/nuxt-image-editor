<template>
  <div class="flex pt-[50px] pl-[50px] items-center gap-2">
    <Canvas  :canvasRef="canvasRef"  :contextRef="contextRef" canvasId="canvasRef" />

    <button
      class="bg-red-400 text-white hover:bg-red-500 hover:border px-2 rounded"
      @click="grayFilter(contextRef, contextRef2)"
    >
      GRAY FILTER
    </button>
    <Canvas :canvasRef="canvasRef2" :contextRef="contextRef2" canvasId="canvasRef2" />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import Canvas from "~/components/Canvas.vue";
import { grayFilter } from "~/utils/filter";

const userStore = useUserStore();
const contextRef = ref<CanvasRenderingContext2D | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const canvasRef2 = ref<HTMLCanvasElement | null>(null);
const contextRef2 = ref<CanvasRenderingContext2D | null>(null);

console.log(userStore.images);

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
    canvasRef.value = document.getElementById("canvasRef") as HTMLCanvasElement;
    canvasRef2.value = document.getElementById(
      "canvasRef2"
    ) as HTMLCanvasElement;
    if (!canvasRef.value || !canvasRef2.value) return;
    contextRef.value = canvasRef.value.getContext("2d");
    contextRef2.value = canvasRef2.value.getContext("2d");

    canvasRef.value.width = image.width < 300 ? image.width : 300;
    canvasRef.value.height = image.height < 300 ? image.height : 300;
    canvasRef2.value.width = canvasRef.value.width;
    canvasRef2.value.height = canvasRef.value.height;

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
</script>
