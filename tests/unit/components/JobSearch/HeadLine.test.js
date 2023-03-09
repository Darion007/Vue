import { mount } from "@vue/test-utils";
import HeadLine from "@/components/JobSearch/HeadLine.vue";
import { nextTick } from "vue";

describe("HeadLine", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("displays introductory action verb", () => {
    // jest.useFakeTimers();
    const wrapper = mount(HeadLine);
    const actionPhrase = wrapper.find("[data-test='action-phrase']");
    expect(actionPhrase.text()).toBe("Build for everyone");
    // jest.useRealTimers();
  });

  it("change action verb at a consistent", () => {
    // jest.useFakeTimers();
    jest.spyOn(global, "setInterval");
    mount(HeadLine);
    expect(setInterval).toHaveBeenCalled();
    // jest.useRealTimers();
  });

  it("swaps action after first interval", async () => {
    // jest.useFakeTimers();
    const wrapper = mount(HeadLine);
    jest.runOnlyPendingTimers();
    await nextTick();
    const actionPhrase = wrapper.find("[data-test='action-phrase']");
    expect(actionPhrase.text()).toBe("Create for everyone");
    // jest.useRealTimers();
  });

  it("removes interval when component disappears", () => {
    // jest.useFakeTimers();
    const wrapper = mount(HeadLine);
    jest.spyOn(global, "clearInterval");
    wrapper.unmount();
    expect(clearInterval).toHaveBeenCalled();
    // jest.useRealTimers();
  });
});
