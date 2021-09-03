module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  testEnvironment: "node",
  transform: {
    "^.+\\.vue$": "vue-jest",
    // '^.+\\.tsx?$': 'ts-jest',
    // "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  // testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$"
};
