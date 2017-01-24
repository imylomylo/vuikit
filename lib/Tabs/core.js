export default {
  props: {
    activeTab: [String, Number],
    // align tabs right and in reversed order
    flip: {
      type: Boolean,
      default: false
    },
    // center the tabs
    center: {
      type: Boolean,
      default: false
    },
    // place the tabs at the bottom
    bottom: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: 'vk-tabs-transition'
    }
  },
  computed: {
    tabs: {
      get () {
        return this.$slots.default.filter(c =>
          c.componentOptions && c.componentOptions.tag === 'vk-tab'
        )
      },
      cache: false
    }
  },
  beforeMount () {
    this._updateTabs()
  },
  beforeUpdate () {
    this._updateTabs()
  },
  methods: {
    getTabAlias (tab) {
      return tab.componentOptions.propsData.alias || this.tabs.indexOf(tab) + 1
    },
    _updateTabs () {
      this.tabs.forEach((tab, index) => {
        const alias = this.getTabAlias(tab)
        const active = this.activeTab === alias
        const props = tab.componentOptions.propsData
        props.active = active
        props.alias = alias
      })
    }
  }
}
