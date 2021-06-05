import store from '../../../vue-auth-learn/src/store'

export function WhereWantedToGo(location) {
    console.log(location);
    store.commit('changeWantedRoute', location)
}