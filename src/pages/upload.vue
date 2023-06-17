<template>
  <div class="h-screen">
    <MainLayout>
      <div class="flex flex-col gap-2 justify-center items-center h-full">
        <div v-if="userStore.isLoading"><Loading /></div>
        <div
          @mouseenter="isHover = true"
          @mouseleave="isHover = false"
          @drop.prevent="handleUpload"
          @dragenter="isHover = true"
          @dragleave="isHover = false"
          @click="triggerInput"
          :class="[isHover ? 'bg-gray-100 border-gray-500' : 'border-gray-400']"
          class="flex justify-center w-[50%] h-[50%] transition-all ease-in-out duration-200 border"
        >
          <input
            class="hidden w-full h-full"
            @input="handleUpload"
            type="file"
            id="fileinput"
          />
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
        <div v-if="userStore.image" class="bg-blue-600 hover:bg-blue-700 rounded-md px-1">
          <NuxtLink to="/editor"><span class="text-white text-[16px]">Let's go</span></NuxtLink>
        </div>
      </div>
    </MainLayout>
  </div>
</template>

<script setup lang="ts">
import MainLayout from "~/layouts/MainLayout.vue";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
const events = ["dragenter", "dragleave", "dragover", "drop"];

let isHover = ref(false);

onMounted(() => {
  events.forEach((event) =>
    document.body.addEventListener(event, (e) => e.preventDefault())
  );
});

onUnmounted(() => {
  events.forEach((event) =>
    document.body.removeEventListener(event, (e) => e.preventDefault())
  );
});

const emit = defineEmits<{ (e: "upload", file: File): void }>();

function handleUpload(e: any): void {
  const files: FileList | null | undefined = e.dataTransfer
    ? (e as DragEvent).dataTransfer?.files
    : e.target
    ? (e.target as HTMLInputElement).files
    : null;

  if (!files) return;

  userStore.isLoading = true;
  const reader = new FileReader();
  reader.onload = (e) => {
    if (e.target) {
      if (e.target.result instanceof ArrayBuffer) {
        userStore.image = new TextDecoder().decode(e.target.result);
      } else {
        userStore.image = e.target.result;
      }
    }
  };

  reader.readAsDataURL(files[0]);
  emit("upload", files[0]);
  userStore.isLoading = false;
}

function triggerInput(): void {
  document.getElementById("fileinput")?.click();
}
</script>
