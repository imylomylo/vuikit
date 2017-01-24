import { merge } from 'helpers/util'

export default {
  functional: true,
  props: ['checked'],
  render (h, { data, props }) {
    return h('input', merge(data, {
      staticClass: 'uk-checkbox',
      attrs: {
        type: 'checkbox'
      },
      domProps: {
        checked: props.checked
      },
      on: merge(data.on, {
        change: e => {
          // ensures checked state consistency
          e.target.checked = props.checked
        }
      })
    }))
  }
}
