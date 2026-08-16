import { createStore } from 'vuex'
import leagues from './modules/leagues'
import badges from './modules/badges'

export default createStore({
  modules: {
    leagues,
    badges
  }
})
