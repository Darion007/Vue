<template>
  <div class="w-full h-16 bg-white border-b border-solid border-brand-gray-1">
    <div class="flex items-center h-full px-8">
      <div><font-awesome-icon :icon="['fas', 'user-secret']" /></div>
      <div v-if="onJobResultspage" data-test="job-count">
        <font-awesome-icon :icon="['fas', 'fa-search']" class="mr-3" />
        <span> <span class="text-brand-green-1">1653</span>jobs matched </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Subnav",
  computed: {
    onJobResultspage() {
      return this.$route.name === "JobResults";
    },
  },
};
</script>
