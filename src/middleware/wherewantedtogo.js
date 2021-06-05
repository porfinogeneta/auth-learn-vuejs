import store from '../store/index'

export function WhereWantedToGo(location) {
    console.log(location);
    store.commit('changeWantedRoute', location)
}