import { mount } from '@vue/test-utils'
import FindWord from "@/components/account/FindWord.vue"

describe('FindWord.vue', () => {
  test('Check sending a text', () => {
    const wrapper = mount(FindWord)

    const input = wrapper.find("input")
    input.setValue("iii")

    expect(input.element.value).toBe("iii")

    wrapper.find("input").trigger("keyup.enter")
    expect(wrapper.emitted()).toHaveProperty(["findItem"])
    expect(wrapper.emitted()).toHaveProperty(["editPage"])
  })
})