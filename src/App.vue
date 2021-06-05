<template>
  <router-view></router-view>
</template>


<script>
import{ onBeforeMount, ref } from 'vue'
import { useRouter} from 'vue-router';
import fire from '@/firebase';
import { useStore } from 'vuex'


export default {
  setup() {

    const router = useRouter();

    // const route = useRoute();

    const store = useStore()

    const CurrenUser = ref({})

    // watchEffect(()=> {
    //   console.log('watch effect', store.state.WantedToGo);
    // })

    onBeforeMount(() => {
      console.log(CurrenUser.value);
      fire.auth().onAuthStateChanged((user) => {
        if (user) {
          // store.state.CurrenUser = user
          // router.push(store.state.WantedToGo)
          store.commit('setIsLoggedIn', true)
          store.commit('setAuthUser', user)
          console.log('logged in', store.state.isLoggedIn);

        }else {
          // router.replace('/globalData');
          // store.state.CurrenUser = user
          router.push('/login')
          store.commit('setIsLoggedIn', false)
          store.commit('setAuthUser', user)
          console.log('not logged in', store.state.isLoggedIn);
          // CurrenUser.value = user
          // }else if (route.path == '/login' || route.path == '/register'){
          //   router.replace('/')
        }
      })
    })

    return {

    }
  }
}
</script>

<style lang="scss">
body {
  background: #2c2c2c;
  color: #FFF;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
a {
  color: inherit;
}

</style>
