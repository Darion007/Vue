<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <job-listing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      />
    </ol>

    <div class="mt-8 mx-auto">
      <div class="flex flex-row flex-nowrap">
        <p class="text-sm flex-grow">Page {{ currentPage }}</p>
        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="previous-page-link"
            >Previous</router-link
          >
          <router-link
            v-if="nextPage"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="next-page-link"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script type="module">
import axios from "axios";
import JobListing from "@/components/JobResults/JobListing.vue";

export default {
  name: "JobListings",
  components: {
    JobListing,
  },

  data() {
    return {
      jobs: [],
    };
  },
  computed: {
    currentPage() {
      const pageString = this.$route.query.page || "1"; //字符串
      return Number.parseInt(pageString); //数字
    },
    previousPage() {
      const previousPage = this.currentPage - 1; //
      const firstPage = 1;
      return previousPage >= firstPage ? previousPage : undefined;
    },
    nextPage() {
      const nextPage = this.currentPage + 1;
      const maxPage = Math.ceil(this.jobs.length / 10);
      // console.log(this.jobs.length);
      return nextPage <= maxPage ? nextPage : undefined;
    },
    displayedJobs() {
      const pageNumber = this.currentPage;
      const firstJobIndex = (pageNumber - 1) * 10; //1
      const lastJobIndex = pageNumber * 10; //10
      return this.jobs.slice(firstJobIndex, lastJobIndex);
    },
  },
  async mounted() {
    //动态值，三个环境中的一个
    const BASE_URL = process.env.VUE_APP_API_URL;
    // console.log(BASE_URL);
    const response = await axios.get(BASE_URL);
    // console.log(response);
    this.jobs = response.data;
  },
};
</script>
