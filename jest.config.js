module.exports = {
  preset: "ts-jest",
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.vue$": "vue-jest",
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  globals: {
    "vue-jest": {
      tsConfig: "./tsconfig.json"
    }
  },
  testRegex: "(/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$"
};
