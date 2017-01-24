import { createVue, destroyVM, triggerKeyEvent, queryByTag, getSnapshot } from './_util'
import waitForUpdate from './_wait-for-update'

describe('Modal', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('renders correctly', done => {
    const snapshot = getSnapshot(`
      <vk-modal
        :show="true">
        <vk-modal-close />
        <vk-modal-header>
          <h2 class="uk-modal-title">Headline</h2>
        </vk-modal-header>
        <vk-modal-body>Content</vk-modal-body>
        <vk-modal-footer class="uk-text-right">
          Footer
        </vk-modal-footer>
      </vk-modal>
    `)
    waitForUpdate(() => {
      expect(snapshot).toMatchSnapshot()
    }).then(done)
  })

  it('adds classes to document on display', done => {
    vm = createVue(`
      <vk-modal :show="true">
        <vk-modal-body>Content</vk-modal-body>
      </vk-modal>
    `)
    waitForUpdate(() => {
      expect(document.documentElement.classList.contains('uk-modal-page')).toBeTruthy()
    }).then(done)
  })

  it.skip('removes classes from document when hidden', done => {
    vm = createVue({
      template: `
        <vk-modal :show="show">
          <vk-modal-body>Content</vk-modal-body>
        </vk-modal>
      `,
      data: () => ({
        show: true
      })
    })
    waitForUpdate(() => {
      vm.show = false
    }).then(() => {
      expect(document.documentElement.classList.contains('uk-modal-page')).toBeFalsy()
    }).then(done)
  })

  it('triggers event escKey when pressed ESC', done => {
    vm = createVue(`
      <vk-modal :show="true">
        <vk-modal-body>Content</vk-modal-body>
      </vk-modal>
    `)
    const cb = jest.fn()
    const modal = queryByTag(vm, 'vk-modal')
    modal.$on('keyEsc', cb)
    triggerKeyEvent(document.documentElement, 27)
    waitForUpdate(() => {
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })

  it('triggers event clickOut when clicked outside the Modal dialog', done => {
    vm = createVue(`
      <vk-modal :show="true">
        <vk-modal-body>Content</vk-modal-body>
      </vk-modal>
    `)
    const cb = jest.fn()
    const modal = queryByTag(vm, 'vk-modal')
    modal.$on('clickOut', cb)
    modal.$el.click()
    waitForUpdate(() => {
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })

  it('triggers event clickIn when clicked inside the Modal dialog', done => {
    vm = createVue(`
      <vk-modal :show="true">
        <vk-modal-body>Content</vk-modal-body>
      </vk-modal>
    `)
    const cb = jest.fn()
    const modal = queryByTag(vm, 'vk-modal')
    modal.$on('clickIn', cb)
    modal.$refs.panel.click()
    waitForUpdate(() => {
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })

  it.skip('triggers event inactive when other Modals becomes active', done => {
    vm = createVue({
      template: `
        <div>
          <vk-modal ref="modal1" :show="show.modal1">
            <vk-modal-body>Content</vk-modal-body>
          </vk-modal>
          <vk-modal ref="modal2" :show="show.modal2">
            <vk-modal-body>Content</vk-modal-body>
          </vk-modal>
        </div>
      `,
      data: () => ({
        show: {
          modal1: false,
          modal2: false
        }
      })
    }, true)
    const cb = jest.fn()
    vm.$refs.modal1.$on('inactive', cb)
    waitForUpdate(() => {
      vm.show.modal2 = true
    }).then(() => {
      expect(cb).toHaveBeenCalled()
    }).then(done)
  })
})
