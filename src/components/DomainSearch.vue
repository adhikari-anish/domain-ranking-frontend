<template>
  <div class="search">
    <input
      v-model="value"
      class="input"
      placeholder="Type domains: google.com, openai.com"
      @keydown.enter="submit"
    />
    <button class="btn" @click="submit" :disabled="loading">
      {{ loading ? "Searching..." : "Search" }}
    </button>
  </div>

  <p class="hint">Tip: separate multiple domains with commas.</p>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{ loading?: boolean }>();
const emit = defineEmits<{ (e: "search", domains: string[]): void }>();

const value = ref("");

function submit() {
  const domains = value.value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  emit("search", domains);
}
</script>

<style scoped>
.search { display: flex; gap: 10px; }
.input { flex: 1; padding: 12px 14px; border: 1px solid #ddd; border-radius: 12px; outline: none; }
.btn { padding: 12px 16px; border: 0; border-radius: 12px; cursor: pointer; }
.hint { margin-top: 8px; opacity: 0.7; font-size: 0.95rem; }
</style>
