import { mount } from '@vue/test-utils'
import ChooseLang from "../../../src/components/app/ChooseLang.vue"

describe('Folders.vue', () => {
  const MessageComponent = {
    template: '<p>{{ msg }}</p>',
    props: ['msg']
  }

  test('displays message', () => {
    const wrapper = mount(ChooseLang, {
      props: {
        msg: 'Hello world'
      }
    })

    expect(wrapper.contains("div")).toBeTruthy()
  })
})