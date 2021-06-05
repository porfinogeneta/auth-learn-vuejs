// import WhereWantedToGo from '../middleware/wherewantedtogo'

export default function (to, next, store){
    // console.log(store);
    if (!store.state.isLoggedIn) {
        store.state.WhereWantedToGo = to
        next('/login')
    }else {
        next()
    }
}