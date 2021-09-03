import { mount } from '@vue/test-utils'
import ChooseLang from "@/components/app/ChooseLang.vue"

describe('Folders.vue', () => {
  test('displays message', () => {
    const wrapper = mount(ChooseLang, {
      propsData: {
        title: 'Vue Project'
      }
    })

    // check the name of the component
    expect(wrapper.vm.$options.name).toMatch('Header')

    // check that the title is rendered
    expect(wrapper.text()).toMatch('Vue Project')
  })
})