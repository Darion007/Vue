import { mount } from "@vue/test-utils";

import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";

describe("JobSearchForm", () => {
  describe("when user submit form", () => {
    it("deriects user to job results page with user's search parameters", async () => {
      const push = jest.fn();
      const $router = { push };
      const wrapper = mount(JobSearchForm, {
        attachTo: document.body,
        global: {
          mocks: {
            $router,
          },
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });
      const roleInput = wrapper.find("[data-test='role-input']");
      await roleInput.setValue("VUE developer");

      const locationInput = wrapper.find("[data-test='location-input']");
      await locationInput.setValue("ShenZhen");

      const submitButton = wrapper.find("[data-test='form-submit-button']");
      await submitButton.trigger("click");

      expect(push).toBeCalledWith({
        name: "JobResults",
        query: { role: "VUE developer", location: "ShenZhen" },
      });
    });
  });
});
