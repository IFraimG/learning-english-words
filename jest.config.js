module.exports = {
  preset: "ts-jest",
  // preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "vue3-jest",
    '^.+\\.tsx?$': 'ts-jest',
    "^.+\\.js$": "babel-jest"
  },
  // rootDir: "src",
  // moduleNameMapper: {
  //   // '^@/(.*)$': '<rootDir>/src/$1',
  //   "@(.*)$": "<rootDir>/src/$1",
  //   "\\.(css|scss)$": "identity-obj-proxy"
  // },
  moduleNameMapper: {
    // '^@/(.*)$': '<rootDir>/src/$1',
    "@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    // "\\.(css|scss)$": "identity-obj-proxy"
  },
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  collectCoverageFrom: ["**/*.{ts,vue}", "!**/node_modules/**"],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
  // testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$"
};
