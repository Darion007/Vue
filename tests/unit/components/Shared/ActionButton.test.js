import { mount } from "@vue/test-utils";

import ActionButton from "@/components/Shared/ActionButton.vue";

describe("ActionButton", () => {
  it("renders", () => {
    const wrapper = mount(ActionButton, {
      global: {
        stubs: {
          props: {
            text: {
              type: String,
              required: true,
            },
          },
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
