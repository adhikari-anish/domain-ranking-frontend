<template>
  <div class="container">
    <h1 class="title">Domain Ranking</h1>
    <p class="subtitle">Search one or more domains and compare ranking trends.</p>

    <DomainSearch :loading="loading" @search="onSearch" />

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="result" class="result" :class="{ blur: loading }">
      <RankingChart :data="result" />
      <div v-if="loading" class="overlay">Loading…</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DomainSearch from "@/components/DomainSearch.vue";
import RankingChart from "@/components/RankingChart.vue";
import { fetchRankings, type RankingResponse } from "@/api/rankingApi";

const loading = ref(false);
const error = ref("");
const result = ref<RankingResponse | null>(null);

async function onSearch(domains: string[]) {
  error.value = "";
  if (!domains.length) {
    error.value = "Please enter at least one domain.";
    return;
  }

  loading.value = true;
  try {
    result.value = await fetchRankings(domains);
  } catch {
    error.value = "Failed to fetch rankings.";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.container { max-width: 900px; margin: 40px auto; padding: 0 16px; }
.title { margin: 0; font-size: 2.2rem; }
.subtitle { margin: 8px 0 18px; opacity: 0.75; }
.error { margin-top: 14px; padding: 10px 12px; border-radius: 12px; background: #ffecec; }
.result { margin-top: 18px; position: relative; }
.blur { filter: blur(2px); }
.overlay { position: absolute; inset: 0; display: grid; place-items: center; font-weight: 600; }
</style>
