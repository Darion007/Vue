module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  transformIgnorePatterns: ["node_modules/(?!axios)"],
  // transformIgnorePatterns: ["/node_modules/(?!(uuid)/)"],
};
