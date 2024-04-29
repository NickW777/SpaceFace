<template>
  <div class="d-flex flex-col relative">

    <div
      class="
        relative
        before:absolute
        before:inset-0
        before:-translate-x-full
        before:animate-shimmer
        before:bg-gradient-to-r
        before:from-transparent
        before:via-gray-200
        before:to-transparent
        overflow-hidden
        rounded-xl
      ">

      <div
        class="bg-gray-300 h-[120px] w-full rounded-xl"
      ></div>

    </div>

    <div>
      <div class="flex gap-2 py-2 flex-col">
        <div
          class="bg-gray-300 h-4 w-full rounded-full animate-pulse"
        ></div>
        <div class="flex gap-1">
          <div
            class="bg-gray-300 h-4 w-2/3 rounded-full animate-pulse"
          ></div>
        </div>
      </div>
    </div>


  </div>
</template>