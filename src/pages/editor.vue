<template>
  <div class="flex pt-[50px] pl-[50px]">
    <div class="flex flex-col justify-center gap-[20px]">
      <canvas
        id="originalCanvas"
        class="border border-blue-800"
        :ref="canvasRef"
        @mousemove="onMouseMove"
      >
      </canvas>
      <div v-if="computedPixels">
        <span>WTF</span>
        <div>{{ computedPixels.data[currIndex] }}</div>
        <span>WTF2</span>
        <div class="flex flex-wrap w-[320px] justify-center">
          <div
            class="w-[20px] h-[20px] border border-gray-900"
            :class="`${index === currIndex ? 'bg-blue-800' : ''} `"
            v-for="(item, index) in computedPixels.data"
            :key="index"
            @mouseover="onMouseOver(index)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import MainLayout from "~/layouts/MainLayout.vue";
import Canvas from "~/components/Canvas.vue";
import { VNodeRef } from "nuxt/dist/app/compat/capi";

const userStore = useUserStore();
const emit = defineEmits(["update:computedPixels"]);
const canvasRef = ref<VNodeRef | null>(null);

console.log(userStore.images);
const updatedCanvas = ref<HTMLCanvasElement | null>(null);
let currIndex = ref<number>(0);

let computedPixels = computed({
  get: () =>
    canvasRef.value
      ? canvasRef.value.getContext("2d").getImageData(0, 0, 20, 20)
      : null,
  set: (val) => emit("update:computedPixels", val),
});
onMounted(() => {
  if (!canvasRef) return;
  const ctx = canvasRef.value.getContext("2d");
  computedPixels.value = ctx
    .getImageData(0, 0, 20, 20)
    .data.reduce((result: any, number: number, index: number) => {
      const groupIndex = Math.floor(index / 4); // Group size is 4 in this example
      if (!result[groupIndex]) {
        result[groupIndex] = {};
      }
      result[groupIndex][index % 4] = number;
      return result;
    }, []);
  console.log(computedPixels.value);
});

onBeforeMount(() => {
  const image = new Image();
  canvasRef.value = document.getElementById("originalCanvas");

  image.onload = () => {
    if (!canvasRef) return;
    const ctx = canvasRef.value.getContext("2d");
    canvasRef.value!.width = image.width < 400 ? image.width : 400;
    canvasRef.value!.height = image.height < 400 ? image.height : 400;

    ctx.drawImage(
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

    //originalArray.value = ctx.getImageData(0, 0, 400, 400);
    //console.log(originalArray.value);
  };

  image.src = "_nuxt/assets/temp.jpg";
});

const onMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e;
  let point = computePointInCanvas(canvasRef, clientX, clientY);
  if (!point) return;
  const ctx = canvasRef.value?.getContext("2d");
  console.log({ ...ctx!.getImageData(point.x, point.y, 1, 1).data });
  console.log(point);
};

const onMouseOver = (index: number) => {
  console.log(computedPixels.value);
  console.log(computedPixels.value.data[currIndex.value]);
  currIndex.value = index;
  console.log(index);
};
</script>
