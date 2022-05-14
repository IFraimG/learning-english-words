const { VueRouterMock, createRouterMock, injectRouterMock } = require("vue-router-mock")
const { config } = require("@vue/test-utils")
// const { beforeEach } = require("jest")

const router = createRouterMock()

beforeEach(() => {
  injectRouterMock(router)
})

config.plugins.VueWrapper.install(VueRouterMock)
