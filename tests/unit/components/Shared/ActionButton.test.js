import { shallowMount } from "@vue/test-utils";

import ActionButton from "@/components/Shared/ActionButton.vue";

describe("ActionButton", () => {
  it("renders", () => {
    const wrapper = shallowMount(ActionButton, {
      global: {
        stubs: {
          props: true,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
