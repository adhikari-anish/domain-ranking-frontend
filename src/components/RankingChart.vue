<template>
  <div class="chartWrap">
    <canvas ref="canvasEl"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import Chart from "chart.js/auto";
import type { RankingResponse } from "@/api/rankingApi";

const props = defineProps<{ data: RankingResponse }>();

const canvasEl = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

function buildChartPayload(apiData: RankingResponse) {
  const series = apiData.domains;

  // union of all dates
  const dateSet = new Set<string>();
  for (const s of series) for (const r of s.ranks) dateSet.add(r.date);
  const labels = Array.from(dateSet).sort();

  const datasets = series.map((s) => {
    const map = new Map(s.ranks.map((r) => [r.date, r.rank]));
    return {
      label: s.domain,
      data: labels.map((d) => map.get(d) ?? null),
      tension: 0.25,
      spanGaps: true,
    };
  });

  return { labels, datasets };
}

function render() {
  if (!canvasEl.value) return;

  const payload = buildChartPayload(props.data);

  chart?.destroy();
  chart = new Chart(canvasEl.value, {
    type: "line",
    data: payload,
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        tooltip: { mode: "index", intersect: false },
      },
      interaction: { mode: "index", intersect: false },
      scales: {
        y: {
          reverse: true, // ranking: smaller = better
          title: { display: true, text: "Rank (lower is better)" },
        },
        x: { title: { display: true, text: "Date" } },
      },
    },
  });
}

onMounted(render);
watch(() => props.data, render, { deep: true });
onBeforeUnmount(() => chart?.destroy());
</script>

<style scoped>
.chartWrap { background: white; border: 1px solid #eee; border-radius: 16px; padding: 16px; }
</style>
