import { ref, computed } from 'vue'

export function useCounter(init: number = 0) {
  const count = ref(init)
  const double = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return {
    count,
    double,
    increment
  }
}