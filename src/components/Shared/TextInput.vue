<template>
  <input
    :value="modelValue"
    :placeholder="placeholder"
    type="text"
    class="w-full text-lg font-normal focus:outline-none"
    @input="handleInput"
  />
</template>

<script>
export default {
  name: "Textinput",

  props: {
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],

  methods: {
    handleInput($event) {
      // this.$emit("handleInput", $event.target.value); //向父组件发送数据
      this.$emit("update:modelValue", $event.target.value);
    },
  },
};
</script>
