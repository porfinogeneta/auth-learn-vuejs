// import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      isLoggedIn: false,
      authUser: {},
      WantedToGo: '/'
    }
  },
  mutations: {
    setIsLoggedIn(state, bool) {
      state.isLoggedIn = bool;
    },
    // może być cokolwiek zamiast payload
    setAuthUser(state, payload) {
      state.authUser = payload
      // console.log(payload);
    },
    changeWantedRoute(state, LinkPayload) {
      state.WantedToGo = LinkPayload
    }
  },
})

export default store;