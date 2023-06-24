<template>
  <div>
   

    <div
      v-if="originalArray"
      class="flex flex-wrap max-w-[400px] max-h-[200px] overflow-auto"
    >
      <span
        v-for="pixel in [255, 222, 3, 14, 15, 36, 15, 15, 28]"
        class="border-red px-2"
        >{{ pixel }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { computePointInCanvas } from "~/utils/element";

const props = defineProps(["canvasRef", "handleMouseMove"]);
const { canvasRef, handleMouseMove } = toRefs(props);

let canvasRef2 = ref(null);
const userStore = useUserStore();

let originalArray = ref<ImageData | null>(null);

</script>
