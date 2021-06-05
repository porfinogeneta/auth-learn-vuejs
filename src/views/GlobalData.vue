<template>
  <h1>Global Data aaaa</h1>
  <h1>Great test</h1>
  <router-link v-show="!getToKnowIsLoggedIn" to="/login" >If you want to add something please login</router-link>
  <br>
  <router-link v-show="getToKnowIsLoggedIn" class="moveLinks" to="/about">About</router-link>
  <router-link v-show="getToKnowIsLoggedIn" class="moveLinks" to="/">If you want to create</router-link>
  <section>
    <h1>Global Data:</h1>
    <section v-for="(item, index) in state.GlobalData" :key="index">
      {{item}}
    </section>
  </section>
</template>

<script>
import {useStore} from 'vuex';
import {computed, onMounted, reactive} from 'vue'
import fire from '@/firebase'

export default {
  name: 'Login',
  setup() {

    const store = useStore()

    const state = reactive({
      GlobalData: []
    })

    const getToKnowIsLoggedIn = computed(() => {
        return store.state.isLoggedIn
    })

    onMounted(() => {
        fire.database().ref('/globalData/').once('value').then((snapshot) => {
        state.GlobalData = snapshot.val();
      });
    })
    
    return {
      getToKnowIsLoggedIn,
      state
    }
  }
}
</script>

<style lang='scss' scoped>
.moveLinks {
  margin: 3vh;
}
</style>