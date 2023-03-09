import { mount } from "@vue/test-utils";
import Subnav from "@/components/Navigation/Subnav.vue";

describe("Subnav", () => {
  const createConfig = (routeName) => ({
    global: {
      mocks: {
        $route: {
          name: routeName,
        },
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("when user is on job page", () => {
    it("displays jos count", () => {
      const routeName = "JobResults";
      const wrapper = mount(Subnav, createConfig(routeName));
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(true);
    });
  });

  describe("when user isn't on job page", () => {
    it("does Not display job count", () => {
      const routeName = "Home";
      const wrapper = mount(Subnav, createConfig(routeName));
      const jobCount = wrapper.find("[data-test='job-countd']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
