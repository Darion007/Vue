<template>
  <button :class="buttonClass">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ActionButton",
  props: {
    text: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: false,
      default: "primary",
      validator(value) {
        return ["primary", "secondary"].includes(value);
      },
    },
  },

  computed: {
    buttonClass() {
      return {
        [this.type]: true,
        // primary: this.type === "primary",
        // secondary: this.type === "secondary",
      };
    },
  },
};
</script>

<style scoped>
/* 始终应用的Css样式 */
button {
  @apply px-5 py-3  font-medium;
}
.primary {
  @apply text-white rounded bg-brand-blue-1 hover:shadow-blue;
}
.secondary {
  @apply text-brand-blue-1 bg-transparent hover:bg-brand-blue-2 hover:text-white;
}
</style>
