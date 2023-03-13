import { shallowMount, flushPromises, RouterLinkStub } from "@vue/test-utils";
import axios from "axios";
jest.mock("axios"); //模拟的库
import JobListings from "@/components/JobResults/JobListings.vue";
describe("JobListings", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) }); //在每个套件运行前运行该代码
  });
  afterEach(() => {
    axios.get.mockReset(); //对每个测试套件运行后对axios进行重置，
  });
  // 没有给参数，就返回默认；给了参数就解构添加,如果键相同，则对值进行覆盖替换，不同则添加键值；
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });
  const createConfig = ($route) => ({
    global: {
      mocks: {
        //模拟全局实例属性。这是为了模拟第三方插件注入的变量，而不是Vue的原生属性，如$root， $children等。
        $route,
      },
      stubs: {
        //用引号的原因是这种连字符的语法在JavaScript中不支持，用引号后就可以
        "router-link": RouterLinkStub,
      },
    },
  });

  it("fetches jobs", () => {
    // axios.get.mockResolvedValue({ data: [] });
    // axios.get.mockResolvedValue({ data: Array(15).fill({}) });

    const $route = createRoute();
    shallowMount(JobListings, createConfig($route));
    jest.mock("axios");
    expect(axios.get).toHaveBeenLastCalledWith("http://localhost:3000/jobs");
  });

  it("creates a job listing for a maximum of 10 jobs", async () => {
    // axios.get.mockResolvedValue({ data: Array(10).fill({}) });
    const queryParams = { page: "1" };
    const $route = createRoute(queryParams);
    const wrapper = shallowMount(JobListings, createConfig($route));
    await flushPromises();
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
  });
  // When判断对错的时候就要用assert，用describe开始新的判断
  describe("when query params exclude page number", () => {
    //用fit代替it，可以用来测试测试是否存在污染；
    it("displays page number 1", () => {
      // axios.get.mockResolvedValue({ data: Array(10).fill({}) });
      const queryParams = { page: undefined }; //用于覆盖上面的默认指定值
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route));
      expect(wrapper.text()).toMatch("Page 1");
    });
  });
  describe("when query params include page number", () => {
    it("displays page number", () => {
      // axios.get.mockResolvedValue({ data: Array(10).fill({}) });
      const queryParams = { page: 3 }; //用于覆盖上面的默认指定值
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route));
      expect(wrapper.text()).toMatch("Page 3");
    });
  });
  describe("when user is on first page of job results", () => {
    it("it does not show link to previous page", () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route));
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
    });

    it("shows link to previous page", async () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
    });
  });
  describe("when user is on last page of job results", () => {
    it("it does not show link to next page", async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) }); //不是必须但是便于理解数据来自何处
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
    });
    it("it shows links to next page", async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route));
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(true);
    });
  });
});
