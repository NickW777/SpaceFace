<script setup lang="ts">
defineProps<{
  icon: string;
  iconSize?: string | number;
}>();
</script>

<template>
  <button class="h-14 w-14 rounded-full shadow-gray-400 shadow-sm grid place-items-center">
    <slot>
      <div>
        <mdicon
          :name="icon"
          :size="iconSize ?? 32"
        ></mdicon>
      </div>
    </slot>
  </button>
</template>