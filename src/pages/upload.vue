<template>
  <div class="h-screen">
    <MainLayout>
      <div class="flex justify-center items-center h-full">
        <div
          @mouseenter="isHover = true"
          @mouseleave="isHover = false"
          class="flex justify-center w-[50%] h-[50%] transition-all ease-in-out duration-200 border border-gray-500"
        >
          <input class="w-full h-full hidden" type="file" name="" />
          <div
            class="flex flex-col justify-center items-center min-w-[300px] hover:cursor-pointer"
          >
            <Icon
              :size="isHover ? '40' : '30'"
              class="text-[#347DEB] transition-all ease-in-out duration-1000"
              name="ic:baseline-file-upload"
            />
            <span
              class="transition-all ease-in-out duration-1000"
              :class="[isHover ? 'text-[18px]' : 'text-[16px]']"
              >Drop your file here</span
            >
          </div>
        </div>
      </div>
    </MainLayout>
  </div>
</template>

<script setup lang="ts">
import MainLayout from "~/layouts/MainLayout.vue";

let isHover = ref(false);
</script>
