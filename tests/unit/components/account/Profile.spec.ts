import { mount } from '@vue/test-utils'
import Profile from "@/components/account/Profile.vue"
import { createRouterMock, getRouter, injectRouterMock } from 'vue-router-mock'

describe('Profile.vue', () => {

  test("Check opening the popup of words", async () => {
    const router = getRouter()

    const wrapper = mount(Profile)

    const btn = wrapper.find("button")
    expect(btn.exists()).toBeTruthy()

    await wrapper.find("button").trigger("click")

    await wrapper.vm.$router.push('/new-location')
    expect(wrapper.vm.$route.name).toBe('NewLocation')
  })
})